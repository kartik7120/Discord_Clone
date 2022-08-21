import { Button, Menu, Modal, Title, Group, Text } from "@mantine/core";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
interface Options {
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}
function OptionsComponent(props: Options) {
    const [opened, setOpened] = React.useState(false);

    return <>
        <Modal centered closeOnClickOutside opened={opened} onClose={() => setOpened(false)} title={
            <Title order={3}>
                Are you sure ?
            </Title>}>
            <Text size="lg" style={{ margin: "1em" }}>
                This will permanently delete this channel
            </Text>
            <Group position="center">
                <Button variant="filled" color="red">Yes</Button>
                <Button variant="default" color="violet">No</Button>
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