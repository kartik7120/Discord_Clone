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
export default fetchChannel;
export type { Room }