import {io, Socket} from "socket.io-client";

class SocketioService {
    socket: Socket | undefined;
    constructor() {}

    socketConnection() {
        this.socket = io("http://localhost:9000");
    }
}

export default new SocketioService();
