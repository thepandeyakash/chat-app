import { io } from "socket.io-client";

export let socket;

export const connectSocket = (userId) => {

  if (socket) {
    socket.disconnect();
  }

  const SOCKET_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5001"
      : "/";

  socket = io(SOCKET_URL, {
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