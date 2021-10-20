import "dotenv/config";
import colors from "colors";
import { Server } from "./app";

Server.listen(process.env.PORT, () => {
    console.log(colors.yellow("[SERVER]") + " Servidor Iniciado na Porta: " + colors.gray(process.env.PORT));
});