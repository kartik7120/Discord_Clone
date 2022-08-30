import { Button, Menu, Modal, Title, Group, Text } from "@mantine/core";
import React from "react";
import { deleteRoom } from "./interfaces/interfaces";
import { BsFillTrashFill } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { showNotification } from "@mantine/notifications";
import { BiError } from "react-icons/bi";
import { useMantineTheme } from "@mantine/core"
import { TiTickOutline } from "react-icons/ti";
import { ImExit } from "react-icons/im"
interface Options {
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

async function fetchDeleteChannel({ userSub, channelId }: deleteRoom) {
    const URL = `${process.env.REACT_APP_API_URL}namespace/deleteNamespace/${channelId}`
    const config = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            userSub
        })
    }
    try {
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
async function fetchLeaveRoom({ userSub, channelId }: deleteRoom) {
    const URL = `${process.env.REACT_APP_API_URL}namespace/leaveNamespace/${channelId}`
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            userSub
        })
    }
    try {
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
function OptionsComponent(props: Options) {
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const { user } = useAuth0();
    const { channel, id } = useParams();
    const queryClient = useQueryClient();
    const [opened, setOpened] = React.useState(false);
    const [opened2, setOpened2] = React.useState(false);
    const { isError, error, mutate, isSuccess } = useMutation(["namespace", channel, id, "deletechannel"], fetchDeleteChannel, {
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(["channels", user?.sub], data);
        }
    })
    const { isError: isError2, error: error2, mutate: mutate2, isSuccess: isSuccess2 } = useMutation(["namespace", channel, id, "leavechanne;"], fetchLeaveRoom, {
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(["channels", user?.sub], data);
        }
    })

    if (isError2) {
        console.log(error2);
        showNotification({
            title: "Error",
            message: "Error occured while leaving channel",
            icon: <BiError color={theme.colors.red[1]} />,
            autoClose: 2000,
        })
    }

    if (isSuccess2) {
        navigate("../", { replace: true });
        showNotification({
            title: "Success",
            message: "Channel left !",
            icon: <TiTickOutline />,
            autoClose: 2000
        })
    }
    if (isError) {
        console.log(error);
        showNotification({
            title: "Error",
            message: "Error occured while deleting channel",
            icon: <BiError color={theme.colors.red[1]} />,
            autoClose: 2000,
        })
    }

    if (isSuccess) {
        navigate("../", { replace: true });
        showNotification({
            title: "Success",
            message: "Channel deleted !",
            icon: <TiTickOutline />,
            autoClose: 2000
        })
    }

    function fetchDeleteUserChannel() {
        console.log("Yes button clicked");
        mutate({ channelId: id!, userSub: user?.sub! });
    }
    function fetchUserLeaveRoom() {
        mutate2({ channelId: id!, userSub: user?.sub! });
    }

    return <>
        <Modal centered closeOnClickOutside opened={opened} onClose={() => setOpened(false)} title={
            <Title order={3}>
                Are you sure ?
            </Title>}>
            <Text size="lg" style={{ margin: "1em" }}>
                This will <Text component="span" align="center" variant="gradient"
                    gradient={{ from: "indigo", to: "cyan", deg: 45 }} weight={700}>permanently</Text>  delete this channel
            </Text>
            <Group position="center">
                <Button variant="filled" onClick={fetchDeleteUserChannel} color="red">Yes</Button>
                <Button variant="default" onClick={() => setOpened(false)} color="violet">No</Button>
            </Group>
        </Modal>
        <Modal centered closeOnClickOutside opened={opened2} onClose={() => setOpened2(false)} title={
            <Title order={3}>
                Are you sure ?
            </Title>}>
            <Text size="lg" style={{ margin: "1em" }}>
                You will leave this channel
            </Text>
            <Group position="center">
                <Button variant="filled" onClick={fetchUserLeaveRoom} color="red">Yes</Button>
                <Button variant="default" onClick={() => setOpened2(false)} color="violet">No</Button>
            </Group>
        </Modal>
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button variant="filled">Options</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => props.setOpened(true)}><IoCreateOutline /> Create rooms</Menu.Item>
                <Menu.Item onClick={() => setOpened2(true)} color="red"><ImExit /> Leave Channel</Menu.Item>
                <Menu.Item onClick={() => setOpened(true)} color="red"><BsFillTrashFill /> Delete Channel</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    </>
}
export default OptionsComponent;