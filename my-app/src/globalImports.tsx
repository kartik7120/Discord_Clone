import { io } from "socket.io-client";
import { createContext } from "react";
// const socket = io("http://localhost:4000/");
// const serverSocket = io("http://localhost:4000/Server");
// const channelSocket = io("http://localhost:4000/channel");
const socketContext: React.Context<any> = createContext(null);
function connectNamespace(namespace: string) {
    const nsp = io(`http://localhost:4000/${namespace}`);
    return nsp;
}
// export default socket;
export { connectNamespace, socketContext };