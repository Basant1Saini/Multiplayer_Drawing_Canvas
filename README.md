# Multiplayer Drawing Canvas

A real-time collaborative drawing application built with the MERN stack, featuring live synchronization across multiple users.

## 🚀 Features

- **Real-time Collaboration**: Multiple users can draw simultaneously
- **Live Synchronization**: Changes are instantly reflected across all connected clients
- **Drawing Tools**: Pen, brush, eraser, shapes, and color picker
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Room System**: Create or join drawing rooms
- **User Management**: Display active users in the room

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **Canvas API** - Drawing functionality

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - WebSocket implementation
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MongoDB** (v6.0 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/multiplayer-drawing-canvas.git
cd multiplayer-drawing-canvas
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd server
npm install
```

#### Frontend Setup
```bash
cd ../client
npm install
```

### 3. Environment Configuration

Create `.env` files in both client and server directories:

#### Server `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/drawing-canvas
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### Client `.env`
```env
VITE_SERVER_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Start MongoDB

```bash
# Using MongoDB service
sudo systemctl start mongod

# Or using MongoDB Compass/Atlas
# Make sure your MongoDB instance is running
```

### 5. Run the Application

#### Start Backend Server
```bash
cd server
npm run dev
```

#### Start Frontend Development Server
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📦 Project Structure

```
multiplayer-drawing-canvas/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # CSS files
│   │   └── App.jsx         # Main App component
│   ├── public/             # Static assets
│   ├── package.json
│   ├── vite.config.js      # Vite configuration
│   └── tailwind.config.js  # Tailwind configuration
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── socket/         # Socket.io handlers
│   ├── package.json
│   └── server.js           # Entry point
└── README.md
```

## 🔧 Available Scripts

### Client Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Server Scripts
```bash
npm run dev          # Start with nodemon
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🎨 Key Dependencies

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "socket.io-client": "^4.7.4",
  "tailwindcss": "^3.4.0",
  "vite": "^5.0.0"
}
```

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "socket.io": "^4.7.4",
  "mongoose": "^8.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update environment variables

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Deploy from GitHub repository
3. Ensure MongoDB connection

### Environment Variables for Production
```env
# Server
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
NODE_ENV=production
CORS_ORIGIN=your_frontend_domain

# Client
VITE_SERVER_URL=your_backend_domain
VITE_SOCKET_URL=your_backend_domain
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000/5000
   npx kill-port 3000
   npx kill-port 5000
   ```

2. **MongoDB connection error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access for MongoDB Atlas

3. **Socket connection issues**
   - Check CORS configuration
   - Verify server URL in client environment
   - Ensure both client and server are running

## 📞 Support

If you encounter any issues or have questions, please:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section

---

**Happy Drawing! 🎨**