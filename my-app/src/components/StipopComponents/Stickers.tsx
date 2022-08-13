import { UnifiedComponent } from "stipop-react-sdk";
import { useMantineTheme } from "@mantine/core";
type message = (string | Element | JSX.Element)[];
interface sticker {
    socket: any,
    setMessageState: React.Dispatch<React.SetStateAction<message>>
}
function Stickers(props: sticker) {
    const theme = useMantineTheme();

    function handleStickerClick(stickerObject: any) {
        props.socket.emit("sticker", stickerObject.url!);
        props.setMessageState(function (oldMessages) {
            return [...oldMessages, <img src={stickerObject.url!} style={{ borderRadius: "0.5em",width:"6em" }} alt="sticker" />]
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