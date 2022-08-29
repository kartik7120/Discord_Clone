import { createStyles, Text, useMantineTheme, Button } from "@mantine/core";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme, _params, getRef) => ({
    portal_class: {
        backgroundColor: theme.colors.discord_palette[0],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "3em"
    }
}))
function JoinChannelPortal() {
    const navigate = useNavigate();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    function handleBackClick() {
        navigate(`/explore`, { replace: true })
    }
    return <div className={classes.portal_class}>
        <Button type="button" onClick={handleBackClick} variant={theme.colorScheme === "dark" ? "filled" : "white"}>
            <AiOutlineArrowLeft />Back
        </Button>
        <Text size="lg" align="center" color={theme.white}>
            You are in preview mode , join the server to start chatting
        </Text>
        <Button type="button" variant={theme.colorScheme === "dark" ? "filled" : "white"}>
            Join
        </Button>
    </div>
}
export default JoinChannelPortal;