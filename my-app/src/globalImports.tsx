import { io } from "socket.io-client";
import { createContext } from "react";
const socket = io(`${process.env.REACT_APP_API_URL}`, {
    auth: {
        userName: "kaartik shukla",
        userSub: "123456",
        userPicture: null
    }
});
// const serverSocket = io("http://localhost:4000/Server");
// const channelSocket = io("http://localhost:4000/channel");
const socketContext: React.Context<any> = createContext(null);
function connectNamespace(namespace: string, userSub: string, userPicture: string, userName: string) {
    const nsp = io(`${process.env.REACT_APP_API_URL}`, {
        auth: {
            userName,
            userSub,
            userPicture
        }
    });
    return nsp;
}
// export default socket;
export { connectNamespace, socketContext, socket };