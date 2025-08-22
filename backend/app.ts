require('dotenv').config();
import express, { Express } from 'express';
import cors from 'cors';
import router from './src/routes';
import { notFound } from './src/errors/errors';
import rateLimit from './src/utils/rateLimit';
import dbConnect from './src/config/dbConnect';
import { createServer } from 'http';
import { Server } from 'socket.io';

const { PORT = 3000 } = process.env;

const app: Express = express();
app.use(rateLimit);
app.use(cors());
app.use(express.json());

app.use(router);

app.use((req, res, next) => {
  next(notFound('Page not found'));
});

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: '*', // Any origin is allowed
  },
});
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join', (room: string) => {
    console.log(`Socket ${socket.id} joining room:`, room);
    if (!room) {
      console.warn('Empty room name provided to join');
      return;
    }
    socket.join(room);
    console.log(`Rooms for ${socket.id}:`, Array.from(socket.rooms));
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', socket.id, reason);
  });
});

httpServer.listen(3001, () => {
  console.log('Socket Server listening on port 3001');
});
app.listen(PORT, () => {
  console.log(`connected! on port ${PORT}`);
});

dbConnect();
