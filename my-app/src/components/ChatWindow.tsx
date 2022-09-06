import ActiveNow from "./ActiveNow";
import { BackgroundImage, useMantineTheme, createStyles, clsx } from "@mantine/core";
import discord1 from "../images/discord_svg_white.svg";
import discord2 from "../images/discord_svg_black.svg";
const useStyles = createStyles((theme, _params, getRef) => ({
    img_class: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}))
function ChatWindow() {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return <>
        <div className={clsx("chat-window", classes.img_class)}>
            {theme.colorScheme === "dark" ?
                <img src={discord1} alt="Discord white logo" />
                : <img src={discord2} alt="Discord black logo" />}
        </div>
        <ActiveNow />
    </>
}
export default ChatWindow;