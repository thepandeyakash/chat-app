

import { io } from "socket.io-client";


export let socket;

export const connectSocket = (userId) => {
  
  if (socket) {
    socket.disconnect();
  }

  
  socket = io("http://localhost:5001", {
    query: { userId }, 
    withCredentials: true,
  });

  socket.on("connect", () => {});

  socket.on("disconnect", () => {});
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};