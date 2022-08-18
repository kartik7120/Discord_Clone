import React from "react";
import { SiDiscord } from "react-icons/si";
import { SiMyanimelist } from "react-icons/si";
import { GiPistolGun } from "react-icons/gi";
import { FiAlertTriangle } from "react-icons/fi";
import { FaCompass } from "react-icons/fa";
import { BsPlus, BsFillLightningFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Box, Text, Title, TextInput, Button } from "@mantine/core";
import { Tooltip } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { Modal } from '@mantine/core';
import { createStyles } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { createRoomInterface } from "./interfaces/createRoomInterface";
import fetchChannel from "./interfaces/interfaces";
const useStyles = createStyles((theme, _params, getRef) => ({
    createServerButton: {
        marginTop: "2rem",
        backgroundColor: theme.colors.discord_palette[0],
        '&:hover': {
            backgroundColor: theme.fn.darken(theme.colors.discord_palette[0], 0.2)
        }
    }
}))

async function fetchChannels({ queryKey }: any) {
    const [, _key2] = queryKey;
    console.log(`userSub in fetch channel function = ${_key2}`);
    const URL = `${process.env.API_URL}userNamespaces`;
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(_key2)
    }
    try {
        const response = await fetch(URL);
        const channels = await response.json();
        return channels;
    } catch (error) {
        throw error;
    }
}

function SideBar() {
    const { isAuthenticated, user } = useAuth0();
    const theme = useMantineTheme();
    const [channels, setChannels] = useLocalStorage({ key: "discordChannels", defaultValue: [""] });
    const { isLoading, isError, data, error, isSuccess } = useQuery(["channels", user?.sub], fetchChannels);
    if (isError) {
        console.log("Error occured while fetching namespaces");
        console.log(`fetching error = ${error}`);
    }
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
        {
            isSuccess ? data.map((channel: fetchChannel, index: number) => {
                if (channel)
                    return <Tooltip key={Math.random() * 10 * index * 52} label="MyAnimeList" position="right"
                        withArrow arrowSize={5}
                    >
                        <SidebarIcon icon={<GiPistolGun size="20" />} label={channel.channelName} />
                    </Tooltip>
                return "";
            }) : ""
        }
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
    </div>
}

async function fetchCreateRoom({ value, userSub }: createRoomInterface) {
    const userBody = {
        userSub
    }
    try {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userBody)
        }
        const URL = `${process.env.API_URL || "http://localhost:4000/"}namespace/createNamespace/${value}`;
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
    const { user } = useAuth0();
    const { classes } = useStyles();
    const [state, setState] = React.useState(false);
    const [value, setValue] = React.useState("");
    const { isLoading, isError, error, mutate, isSuccess } = useMutation(["namespace", `${user?.sub}`],
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
        mutate({ value, userSub: user?.sub });
    }

    return <>
        <Modal opened={state} onClose={() => setState(false)} centered size="lg"
            title={<Title order={3}>Create Server</Title>}>
            {isError ? <Alert title="Error while creating namespace" withCloseButton color="red" icon={<FiAlertTriangle />}>
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