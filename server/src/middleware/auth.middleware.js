import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        fullName: true, 
        email: true,
        profilePic: true, 
        createdAt: true, 
      }, 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    req.user = user;

    next(); 

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};