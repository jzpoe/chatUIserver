const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
// Instancia para el servidor al cual nos conectaremos
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Método para verificar cuando se conectan
io.on("connection", (socket) => {
  console.log(`usuario actual :${socket.id}`, "conectado")
  socket.on("join_room", (data)=>{
    socket.join(data)
    console.log(`usuario con id: ${socket.id} se unio a la sala: ${data}`, "conectado")

  })

  socket.on("send_message", (data)=>{
    socket.to(data.room).emit("receive_mesagge", data)
  })

  socket.on("disconnect", () => {
    console.log("usuario desconectado", socket.id);
  });
});

server.listen(3001, () => {
  console.log("conectado al servidor");
});