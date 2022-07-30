import { io } from "socket.io-client";
const socket = io("http://localhost:4000/");

interface ioNamespace {
    namespace: string
}
function connectNamespace(namespace: ioNamespace) {
    const nsp = io(`http://localhost:4000/${namespace}`);
    return nsp;
}
export default socket;
export { connectNamespace };