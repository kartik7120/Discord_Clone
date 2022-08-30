import { createStyles, Text, useMantineTheme, Button } from "@mantine/core";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { TiTick } from "react-icons/ti";
import { BiError } from "react-icons/bi";
import { joinRoom } from "./interfaces/interfaces";
const useStyles = createStyles((theme, _params, getRef) => ({
    portal_class: {
        backgroundColor: theme.colors.discord_palette[0],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "3em"
    }
}))

async function fetchAddChannel({ channelId, userSub }: any) {
    const URL = `${process.env.REACT_APP_API_URL}namespace/joinChannel/${channelId}`;
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ userSub })
    }
    try {
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

function JoinChannelPortal(props: joinRoom) {
    const { channelId } = props;
    const { user } = useAuth0();
    const navigate = useNavigate();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const { isError, error, isSuccess, mutate } = useMutation(["explore", "joinChannel", channelId], fetchAddChannel);
    if (isError) {
        showNotification({
            title: "Error occured",
            message: "Something went wrong while joining channel",
            autoClose: 5000,
            icon: <BiError color="red" />,
            color: "teal"
        })
    }
    if (isSuccess) {
        showNotification({
            title: "Joined channel",
            message: "Joined channel successfully",
            autoClose: 5000,
            icon: <TiTick color="green" />,
            color: "teal"
        })
    }
    function handleBackClick() {
        navigate(`/explore`, { replace: true })
    }
    function handleJoinButtonClick() {
        mutate({ userSub: user?.sub, channelId })
    }
    return <div className={classes.portal_class}>
        <Button type="button" onClick={handleBackClick} variant={theme.colorScheme === "dark" ? "filled" : "white"}>
            <AiOutlineArrowLeft />Back
        </Button>
        <Text size="lg" align="center" color={theme.white}>
            You are in preview mode , join the server to start chatting
        </Text>
        <Button type="button" onClick={handleJoinButtonClick} variant={theme.colorScheme === "dark" ? "filled" : "white"}>
            Join
        </Button>
    </div>
}
export default JoinChannelPortal;