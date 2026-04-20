import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "https://coderoom-4.onrender.com",
    methods: ["GET", "POST"],
  },
});
const userSocketMap = {}
const roomCodeMap = {};
app.use(cors({
  origin: "https://coderoom-4.onrender.com",
  methods: ["GET", "POST"],
}));
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId]
    }
  })
}


io.on('connection', (socket) => {
  // console.log(`user connected ${socket.id}`)
  socket.on('join', ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit('joined', {
        clients,
        username,
        socketId: socket.id,
      });
    });

    // ✅ SEND STORED CODE TO NEW USER (FINAL FIX)
    const code = roomCodeMap[roomId];
    if (code !== undefined) {
      socket.emit('code-change', { code });
    }
  });

  socket.on('code-change', ({ roomId, code }) => {
    roomCodeMap[roomId] = code; // ✅ store latest code
    socket.in(roomId).emit('code-change', { code });
  });

  // socket.on('sync-code', ({ socketId, code }) => {
  //   io.to(socketId).emit('code-change', { code })
  // })


  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms]
    rooms.forEach((roomId) => {
      socket.in(roomId).emit('disconnected', {
        socketId: socket.id,
        username: userSocketMap[socket.id]
      })
    })
    delete userSocketMap[socket.id]
    socket.leave()
  })

})


const PORT = process.env.PORT
server.listen(PORT, () => {
  console.log("server is running")
})