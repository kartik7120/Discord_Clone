import { TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import { FaHashtag } from "react-icons/fa";
import { useMantineTheme } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { socketContext } from "../globalImports";
import React from "react";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import createRoomInterface from "./interfaces/createRoomInterface";
interface createProps {
    setChannels: any,
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}
const useStyles = createStyles((theme, _params, getRef) => ({
    flex_wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
}))
async function fetchRooms({ value, userSub }: createRoomInterface) {
    try {
        // const [_key1, _key2, _key3, _key4] = queryKey;
        const URL = `${process.env.REACT_APP_API_URL}namespace/createRooms`;
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                roomName: value,
                userSub,
            })
        }
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
function ModalCreateChannel(props: createProps) {
    const { channel } = useParams();
    const { user } = useAuth0();
    const queryClient = useQueryClient();
    const d = queryClient.getQueryData(["channel",user?.sub]);
    const { isLoading, isError, data, error, mutate } = useMutation(["namespace", channel, "rooms", user?.sub], fetchRooms)
    const socket = React.useContext(socketContext);
    const navigate = useNavigate();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [inputState, setInputState] = React.useState("");
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const channelName = e.target.value;
        setInputState(channelName);
    }
    function handleClick(e: React.MouseEvent<HTMLElement>) {
        mutate({ value: inputState, userSub: user?.sub });
        props.setChannels(function (oldChannels: string[]) {
            return [...oldChannels, inputState];
        })
        socket.emit("joinRoom", { roomName: inputState }, (response: string) => {
            console.log("Response on joining room = ", response);
        })
        navigate(`./${inputState}`, { replace: true });
        props.setOpened(false);
        setInputState("");
    }
    return (
        <div className={classes.flex_wrapper}>
            <TextInput label="channel-name" placeholder="Enter channel name" icon={<FaHashtag />}
                value={inputState} onChange={handleChange}
            />
            <Button variant="filled" style={{ backgroundColor: theme.colors.discord_palette[0], marginTop: "1rem" }} styles={{
                root:
                {
                    '&:hover':
                    {
                        backgroundColor: theme.fn.darken(theme.colors.discord_palette[0], 0.1)
                    }
                }
            }} onClick={handleClick}>
                Create channel
            </Button>
        </div>
    )
}
export default ModalCreateChannel;