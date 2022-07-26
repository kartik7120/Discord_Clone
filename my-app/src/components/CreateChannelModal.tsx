import { TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import { FaHashtag } from "react-icons/fa";
import { useMantineTheme } from "@mantine/core";
import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme, _params, getRef) => ({
    flex_wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
}))
function ModalCreateChannel() {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
        <div className={classes.flex_wrapper}>
            <TextInput label="channel-name" placeholder="Enter channel name" icon={<FaHashtag />} />
            <Button variant="filled" style={{ backgroundColor: theme.colors.discord_palette[0], marginTop: "1rem" }} styles={{
                root:
                {
                    '&:hover':
                    {
                        backgroundColor: theme.fn.darken(theme.colors.discord_palette[0], 0.1)
                    }
                }
            }}>
                Create channel
            </Button>
        </div>
    )
}
export default ModalCreateChannel;