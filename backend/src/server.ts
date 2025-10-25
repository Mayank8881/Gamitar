import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import { GameManager } from './models/gameManager';
import { GameHandlers } from './socket/gameHandlers';
import routes from './routes';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Enhanced Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'] // Add polling as fallback
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Initialize game
const gameManager = new GameManager();
const gameHandlers = new GameHandlers(gameManager, io);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('✅ Client connected successfully:', socket.id);
  gameHandlers.handleConnection(socket);
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found' 
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Client URL: http://localhost:3000`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔌 WebSocket URL: ws://localhost:${PORT}`);
});

export { app, io, gameManager };