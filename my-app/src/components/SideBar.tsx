import React from "react";
import { SiDiscord } from "react-icons/si";
import { SiMyanimelist } from "react-icons/si";
import { FiAlertTriangle } from "react-icons/fi";
import { FaCompass } from "react-icons/fa";
import { BsPlus, BsFillLightningFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Box, Text, Title, TextInput, Button } from "@mantine/core";
import { Tooltip } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { Modal } from '@mantine/core';
import { createStyles } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
const useStyles = createStyles((theme, _params, getRef) => ({
    createServerButton: {
        marginTop: "2rem",
        backgroundColor: theme.colors.discord_palette[0],
        '&:hover': {
            backgroundColor: theme.fn.darken(theme.colors.discord_palette[0], 0.2)
        }
    }
}))
function SideBar() {
    const { isAuthenticated } = useAuth0();
    const theme = useMantineTheme();
    const [channels, setChannels] = useLocalStorage({ key: "discordChannels", defaultValue: [""] });
    return <div className="sidebar">
        <Tooltip label="Home" position="right" withArrow arrowSize={5}

        >
            <SidebarIcon icon={<SiDiscord size={32} color={"#5663F7"} />} label="Home" />
        </Tooltip>
        <Tooltip label="Add a Server" position="right" withArrow arrowSize={5}

        >
            <SideBarAddIcon setChannels={setChannels} icon={<BsPlus size={32} />} />
        </Tooltip>
        <Tooltip label="Home" position="right" withArrow arrowSize={5}

        >
            <SidebarIcon icon={<BsFillLightningFill size={20} />} />
        </Tooltip>
        <Tooltip label="Explore Servers" position="right" withArrow arrowSize={5}

        >
            <SidebarIcon icon={<FaCompass size="20" />} />
        </Tooltip>
        <Tooltip label="MyAnimeList" position="right" withArrow arrowSize={5}

        >
            <SidebarIcon icon={<SiMyanimelist size="20" />} label="channel" />
        </Tooltip>
        {channels.map((channel, index: number) => {
            if (channel)
                return <Tooltip key={Math.random() * 10 * index * 52} label="MyAnimeList" position="right"
                    withArrow arrowSize={5}
                >
                    <SidebarIcon icon={<SiMyanimelist size="20" />} label={channel} />
                </Tooltip>
            return "";
        })}
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
    </div>
}

async function fetchCreateRoom(value: string) {
    try {
        const config = {
            method: "POST",
            "Content-Type": "application/json"
        }
        const URL = `http://localhost:4000/createNamespace/${value}`;
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

function SidebarIcon({ icon, label }: any) {
    const navigate = useNavigate();
    function handleClick() {
        if (label && label !== "Home")
            navigate(`/${label}`);
        else
            navigate("../");
    }
    return <Box component="div" className="sidebar-icon" onClick={handleClick}>
        {icon}
    </Box>
}

function SideBarAddIcon({ icon, label, setChannels }: any) {
    const navigate = useNavigate();
    const { classes } = useStyles();
    const [state, setState] = React.useState(false);
    const [value, setValue] = React.useState("");
    const { isLoading, isError, error, mutate, isSuccess } = useMutation(["namespace"],
        fetchCreateRoom);
    React.useEffect(function () {
        if (isSuccess) {
            setState(false);
            setChannels(function (oldChannels: string[]) {
                return [...oldChannels, value]
            })
            navigate(`/${value}`, { replace: true });
        }
    }, [isSuccess])
    function handleClick() {
        setState(function (oldState) {
            return !oldState;
        })
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const textInput = e.target.value;
        setValue(textInput);
    }

    function handleCreateNamespace() {
        mutate(value);
    }

    return <>
        <Modal opened={state} onClose={() => setState(false)} centered size="lg"
            title={<Title order={3}>Create Server</Title>}>
            {isError ? <Alert title="Error while creating namespace" color="red" icon={<FiAlertTriangle />}>
                {`${error}`}
            </Alert> : ""}
            <Text weight="normal" size="xl" align="center">
                Your server is a place where you talk with your friends. Make yours and start talking
            </Text>
            <TextInput label="SERVER NAME" placeholder="Enter your server name" value={value} onChange={handleChange} />
            {isLoading ? <Button loading size="md" fullWidth variant="filled"
                className={classes.createServerButton} onClick={handleCreateNamespace}>
                Create Server
            </Button> : <Button size="md" fullWidth variant="filled"
                className={classes.createServerButton} onClick={handleCreateNamespace}>
                Create Server
            </Button>}
        </Modal>
        <Box component="div" className="sidebar-icon" onClick={handleClick}>
            {icon}
        </Box>
    </>
}
export default SideBar;