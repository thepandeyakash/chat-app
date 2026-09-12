import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {

  return userSocketMap[String(receiverId)];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  console.log("🟢 SOCKET CONNECTED", {
    socketId: socket.id,
    userId,
  });

  if (userId && userId !== "undefined") {
    userSocketMap[String(userId)] = socket.id;
  }

  console.log("👥 SOCKET MAP:", userSocketMap);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing", ({ receiverId, senderId, isTyping }) => {

    console.log("⌨️ TYPING:", {
      senderId,
      receiverId,
      isTyping,
      receiverSocketId: getReceiverSocketId(receiverId),
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {

      io.to(receiverSocketId).emit("user_typing", { senderId, isTyping });
    } else {

    }
  });

  socket.on("disconnect", () => {

    if (userId && userId !== "undefined") {
      const currentSocketId = userSocketMap[String(userId)];

      // Only remove the mapping if THIS socket is still
      // the user's active socket.
      if (currentSocketId === socket.id) {
        delete userSocketMap[String(userId)];
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };