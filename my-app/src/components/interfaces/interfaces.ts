interface fetchChannel {
    _id: any
    channelName: string,
    room?: any[],
    description?: string,
    picture?: string
}
interface Room {
    _id: string
    roomName: string
    message: any[]
}
interface deleteRoom {
    userSub: string,
    channelId: string
}
export default fetchChannel;
export type { Room, deleteRoom }