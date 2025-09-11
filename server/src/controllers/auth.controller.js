import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";



export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long." });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (user) return res.status(400).json({ message: "Email already exist." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
            },
        });

        if (newUser) {
            generateToken(newUser.id, res);

            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                createdAt: newUser.createdAt,
            });
        } else {
            res.status(400).json({ message: "Inavlid user data." });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }

};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid user or password." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid user or password." });
        }

        generateToken(user.id, res);
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
};


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully." });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.user.id;

        if (!file) {
            return res.status(500).json({ message: "profile pic is required." });
        }

        const uploadResponse = await cloudinary.uploader.upload(file.path, {
            folder: "profile_pics",
            width: 150,
            crop: "fill"
        });
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                profilePic: uploadResponse.secure_url, // Save the URL from Cloudinary
            },
        });

        res.status(200).json({
            message: "Profile picture updated successfully",
            profilePic: updatedUser.profilePic,
        });


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." })
    }
}


export const checkAuth = (req, res)=> {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." })
    }
};
