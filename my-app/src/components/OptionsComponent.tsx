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
function OptionsComponent(props: Options) {
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const { user } = useAuth0();
    const { channel, id } = useParams();
    const queryClient = useQueryClient();
    const [opened, setOpened] = React.useState(false);
    const { isError, error, mutate, isSuccess } = useMutation(["namespace", channel, id, "deletechannel"], fetchDeleteChannel, {
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(["channels", user?.sub], data);
        }
    })

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

    return <>
        <Modal centered closeOnClickOutside opened={opened} onClose={() => setOpened(false)} title={
            <Title order={3}>
                Are you sure ?
            </Title>}>
            <Text size="lg" style={{ margin: "1em" }}>
                This will permanently delete this channel
            </Text>
            <Group position="center">
                <Button variant="filled" onClick={fetchDeleteUserChannel} color="red">Yes</Button>
                <Button variant="default" onClick={() => setOpened(false)} color="violet">No</Button>
            </Group>
        </Modal>
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button variant="filled">Options</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => props.setOpened(true)}><IoCreateOutline /> Create rooms</Menu.Item>
                <Menu.Item onClick={() => setOpened(true)} color="red"><BsFillTrashFill /> Delete Channel</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    </>
}
export default OptionsComponent;