import { UnifiedComponent } from "stipop-react-sdk";
import { useMantineTheme } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
type message = messageObj<string | Element | JSX.Element>[];
interface messageObj<T> {
    sub: string,
    message: T
}
interface sticker {
    socket: any,
    setMessageState: React.Dispatch<React.SetStateAction<message>>
}

function Stickers(props: sticker) {
    const theme = useMantineTheme();
    const { user } = useAuth0();
    function handleStickerClick(stickerObject: any) {
        props.socket.emit("sticker", stickerObject.url!);
        props.setMessageState(function (oldMessages) {
            return [...oldMessages, {
                message: <img src={stickerObject.url!} style={{ borderRadius: "0.5em", width: "6em" }} alt="sticker" />
                , sub: user?.sub!
            }]
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