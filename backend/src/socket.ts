import colors from "colors";
import { Server } from "socket.io"

export default async (io: Server) => {
    io.on("connection", socket => {
        console.log(colors.yellow("[SOCKET]") + " Socket Conectado com Sucesso: " + colors.yellow(socket.id));

        socket.on("disconnect", () => {
            console.log(colors.red("[SOCKET]") + " Socket Desconectado: " + colors.yellow(socket.id));
        });
    });
};