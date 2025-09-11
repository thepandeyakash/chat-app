import prisma from "../lib/prisma.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const filteredUsers = await prisma.user.findMany({
            where: {
                id: {
                    not: loggedInUserId,
                },
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            },
        });

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {

    
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        if (!text && !image) {
            return res.status(400).json({ message: "Message content cannot be empty." });
        }

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId,
                receiverId: parseInt(receiverId),
                text: text,
                image: imageUrl
            },
        });

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getMessage = async (req, res) => {
    try {
        const { id: userToChatWithId } = req.params;
        const senderId = req.user.id;

        const receiverId = parseInt(userToChatWithId);

        if (isNaN(receiverId)) {
            return res.status(400).json({ error: "Invalid user ID provided" });
        }

        const conversation = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ],
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        res.status(200).json(conversation);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}