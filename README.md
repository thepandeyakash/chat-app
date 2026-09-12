
# ✨ Chat App — Real-Time Full-Stack Messaging

A modern, full-stack **real-time chat application** built with **React, Node.js, Express, PostgreSQL, Prisma, and Socket.IO**.

The application features secure authentication, real-time one-to-one messaging, online presence, typing indicators, image sharing, responsive UI, and production deployment.

---

## 🚀 Live Demo

🌐 **Live Application:** [https://chat-app-3-zgnm.onrender.com](https://chat-app-3-zgnm.onrender.com)

📦 **GitHub Repository:** [https://github.com/thepandeyakash/chat-app](https://github.com/thepandeyakash/chat-app)

---

## ✨ Features

### 🔐 User Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcryptjs
- Protected routes
- Secure logout

### 💬 Real-Time Messaging
- Instant one-to-one messaging using Socket.IO
- Messages appear without refreshing the page
- Persistent message history

### 🟢 Online Presence
- Real-time online/offline status
- Socket-based presence tracking
- Handles multiple active connections

### ⌨️ Typing Indicator
- Real-time typing status
- Shows when another user is typing
- Automatically clears when typing stops

### 🖼️ Image Sharing
- Send images directly through chat
- Image uploads using Multer
- Cloudinary integration for image storage

### 🎨 Modern UI
- Responsive chat interface
- Light/dark theme support
- Tailwind CSS + DaisyUI
- Toast notifications
- Loading and error states

### 🧠 State Management
- Global client-side state management using Zustand

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React | UI Library |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| DaisyUI | Component Library |
| Zustand | State Management |
| Socket.IO Client | Real-Time Communication |
| Axios | HTTP Client |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web Framework |
| Socket.IO | Real-Time Communication |
| PostgreSQL | Database |
| Prisma ORM | Database ORM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Multer | File Uploads |

### Cloud & Deployment
| Service | Purpose |
|---|---|
| Supabase | PostgreSQL Database |
| Cloudinary | Image Storage |
| Render | Production Deployment |

---

## 📁 Project Structure

```text
chat-app/
├── client/
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Page components
│       ├── store/            # Zustand state management
│       └── lib/              # Utility functions and configs
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.js           # Database seeding script
│   │
│   └── src/
│       ├── controllers/      # Route controllers
│       ├── middleware/       # Express middleware
│       ├── routes/           # API routes
│       ├── lib/              # Utility functions and configs
│       └── index.js          # Server entry point
│
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/thepandeyakash/chat-app.git
cd chat-app
```

### 2. Install dependencies

From the project root:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server/` directory:

```env
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLIENT_URL=http://localhost:5173
```

> ⚠️ **Never commit your `.env` file** or expose database, JWT, or Cloudinary credentials publicly.

---

## 🗄️ Database Setup

Navigate to the server directory:

```bash
cd server
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Optional: seed the database if seed data is configured:

```bash
npx prisma db seed
```

Return to the project root:

```bash
cd ..
```

---

## ▶️ Running the App

From the project root:

```bash
npm run dev
```

### Development URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5001 |

The development environment runs the frontend and backend together.

---

## 🔄 Real-Time Architecture

The application uses **Socket.IO** for real-time communication.

### Connection Flow

When a user connects, the server associates their user ID with their active socket connection:

```text
User
  ↓
Socket.IO Connection
  ↓
Server tracks user ↔ socket
  ↓
User becomes online
```

### Message Flow

When a message is sent:

```text
Sender
  ↓
HTTP API
  ↓
Message saved to PostgreSQL
  ↓
Server finds recipient socket
  ↓
Socket.IO emits newMessage
  ↓
Recipient receives message instantly
```

The same authenticated Socket.IO connection handles:

- 💬 Real-time messages
- ⌨️ Typing indicators
- 🟢 Online presence

---

## 🧠 Key Implementation Details

### Authentication
JWT-based authentication is used to protect user sessions and authenticated API requests. Passwords are securely hashed using bcryptjs.

### State Management
Zustand manages application state including:
- Authentication
- Selected conversation
- Messages
- Online users
- Socket connection

### Database
Prisma ORM provides database access and schema management for PostgreSQL.

### Image Uploads
Images are uploaded through the backend using Multer and stored using Cloudinary.

### Real-Time Communication
Socket.IO manages:
- User connections
- Online/offline presence
- Typing events
- Real-time message delivery

---

## 🧪 Testing Checklist

Before deploying a new version, verify:

- [ ] User registration
- [ ] Login and logout
- [ ] Protected routes
- [ ] User list
- [ ] Persistent messages
- [ ] Real-time message delivery
- [ ] Online/offline status
- [ ] Typing indicator
- [ ] Image uploads
- [ ] Image display
- [ ] Messages persist after refresh
- [ ] Multiple users can maintain active connections

---

## 🔮 Future Improvements

- 👥 Group conversations
- 😄 Message reactions and emojis
- 🔔 Push notifications
- 📎 Additional file types
- 🗑️ Message deletion
- ✏️ Message editing
- 🔍 Message search
- ✅ Read receipts
- 🎙️ Voice messages
- 📱 Further mobile UI improvements

---

## 📌 Project Highlights

This project goes beyond a basic CRUD chat application by implementing real-time communication and presence functionality.

### Real-Time Features
- Instant message delivery
- Online/offline presence
- Typing indicators
- Socket-based user tracking
- Multiple active connection handling

### Production Features
- PostgreSQL database
- Prisma ORM
- JWT authentication
- Cloudinary image storage
- Environment-based configuration
- Production deployment with Render

---

## 👨‍💻 Author

**Akash Pandey**

GitHub: [https://github.com/thepandeyakash](https://github.com/thepandeyakash)

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐ on GitHub!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

