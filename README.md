# ✨ Chat App (PERN + Socket.io)

A **modern, real-time chat application** built with the **PERN stack** featuring authentication, live messaging, online/typing status, and a sleek, responsive UI.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** with JWT  
- 💬 **Real-time chat messaging** using Socket.io  
- 🌐 **Online user status**  
- ⌨️ **Typing indicator** (custom feature)  
- 🐞 **Error handling** on both server and client  
- 👌 **Global state management** with Zustand  
- 💅 **Responsive UI** with Tailwind CSS & DaisyUI  

---

## 🛠 Tech Stack

**Frontend:**  
- React  
- Vite  
- Tailwind CSS & DaisyUI  
- Zustand  
- Socket.io-client  

**Backend:**  
- Node.js & Express.js  
- Socket.io  
- PostgreSQL  
- Prisma ORM  

**Authentication:** JWT, bcryptjs  
**File Handling:** Multer, Cloudinary  

---

## ⚡ Installation

**1. Clone the repository:**  
```bash
git clone <your-repo-url>
cd chat-app
2. Install dependencies:

npm install


Installs both client and server dependencies concurrently.

3. Configure environment variables
Create a .env file in the server/ folder:

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


4. Run Prisma migrations and seed data (optional):

npx prisma migrate dev --name init
npx prisma db seed

▶️ Running the App

From the root folder, run:

npm run dev


Frontend: http://localhost:5173

Backend: http://localhost:5000

This starts both the client and server concurrently.

```

## 💡 Usage

Register a new account or login with existing credentials

Start chatting in real-time with other users

See online users and typing indicators

Logout securely using JWT-based authentication



## 🔮 Future Improvements

💬 Group chats

😄❤️ Message reactions & emojis

🔔 Push notifications



## ✅ Notes

Ready to run: Works out-of-the-box with PostgreSQL, Prisma, and Node.js

Typing status and online presence are custom features added for a real-world chat experience
