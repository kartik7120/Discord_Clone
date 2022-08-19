import { Button, Menu } from "@mantine/core";
import { BsFillTrashFill } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
interface Options {
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}
function OptionsComponent(props:Options) {
    return <>
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button variant="filled">Options</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => props.setOpened(true)}><IoCreateOutline /> Create Channel</Menu.Item>
                <Menu.Item color="red"><BsFillTrashFill /> Delete Channel</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    </>
}
export default OptionsComponent;