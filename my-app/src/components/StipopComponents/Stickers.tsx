import { UnifiedComponent } from "stipop-react-sdk";
import { useMantineTheme } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
type message = messageObj<string | Element | JSX.Element>[];
interface messageObj<T> {
    sub: string,
    message: T
}
interface sticker {
    socket: any,
}

function Stickers(props: any) {
    const { user } = useAuth0();
    const { channelName, id, roomId } = useParams();
    const theme = useMantineTheme();
    function handleStickerClick(stickerObject: any) {
        props.socket.emit("sticker", stickerObject.url!, {
            message_content: stickerObject.url,
            userSub: user?.sub!,
            userPicture: user?.picture!, userName: user?.name!,
            category: "image", roomId: roomId!, channelId: id!, channelName
        });
        props.mutate({
            message_content: stickerObject.url,
            userSub: user?.sub!,
            userPicture: user?.picture!, userName: user?.name!,
            category: "image", roomId: roomId!, channelId: id!
        })
    }

    return (
        <>
            <UnifiedComponent params={{
                apikey: `${process.env.REACT_APP_STIPOP_API_KEY}`!,
                userId: `${process.env.REACT_APP_STIPOP_USER_ID}`,
            }} input={{
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[1] : theme.white
            }} menu={{
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[1] : theme.white
            }} stickerClick={handleStickerClick} />
        </>
    )
}
export default Stickers;