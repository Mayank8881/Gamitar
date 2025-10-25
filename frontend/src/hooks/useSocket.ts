import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '../types/game';

// const SOCKET_URL = 'http://localhost:5000';
const SOCKET_URL='https://gamitar-tlt2.onrender.com';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket<SocketEvents, SocketEvents> | null>(null);

  useEffect(() => {
    // Get session ID from localStorage or generate new one
    let sessionId = localStorage.getItem('gridGameSessionId');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('gridGameSessionId', sessionId);
    }

    console.log('Connecting with session ID:', sessionId);

    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      auth: {
        sessionId: sessionId
      }
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('✅ Connected to server with session:', sessionId);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from server');
      setIsConnected(false);
    });

    socket.on('sessionAssigned', (newSessionId: string) => {
      console.log('🎫 Server assigned session:', newSessionId);
      localStorage.setItem('gridGameSessionId', newSessionId);
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected
  };
};