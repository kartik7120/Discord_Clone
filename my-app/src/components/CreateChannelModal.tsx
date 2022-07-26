import { TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import { FaHashtag } from "react-icons/fa";
import { useMantineTheme } from "@mantine/core";
import { createStyles } from "@mantine/core";
import React from "react";
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
function ModalCreateChannel(props: createProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [inputState, setInputState] = React.useState("");
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const channelName = e.target.value;
        setInputState(channelName);
    }
    function handleClick(e: React.MouseEvent<HTMLElement>) {
        props.setChannels(function (oldChannels: string[]) {
            return [...oldChannels, inputState];
        })
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