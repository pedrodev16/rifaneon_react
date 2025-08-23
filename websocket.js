import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "*", // ajusta si quieres restringir
    },
});

io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Escuchar cuando alguien compra un número
    socket.on("ticketPurchased", (data) => {
        // Emitir a TODOS los clientes conectados que hay un nuevo número vendido
        io.emit("ticketUpdate", data);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

server.listen(3001, () => {
    console.log("Servidor WebSocket en puerto 3001");
});
