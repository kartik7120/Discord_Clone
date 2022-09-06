import { ReadStream } from "fs"

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
interface joinRoom {
    channelId: string,
    channelName: string
}
interface messageUser {
    userName: string,
    userPicture: string,
    userSub: string
}
interface messageMutate {
    category: "video" | "audio" | "text" | "video_file" | "audio_file" | "image",
    date?: Date,
    channelId: string,
    message_content: string | File | any,
    userName: string,
    userPicture: string,
    userSub: string,
    roomId: string
}
interface sendFriendRequest {
    userSub: string,
    friendSub: string
}
interface friendRequest {
    user_id: string,
    picture?: string,
    username?: string,
    _id: string
}
interface friend {
    user_id: string,
    picture?: string,
    username?: string,
    _id: string
}
export default fetchChannel;
export type { Room, deleteRoom, joinRoom, messageUser, messageMutate, sendFriendRequest, friendRequest, friend }