import { useMantineTheme, createStyles, ActionIcon, Avatar, Text } from "@mantine/core";
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";
const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: theme.fn.darken(theme.colors.discord_palette[2], 0.2)
        },
        margin: "0.7em",
        height: "3em"
    },
    button_div: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "10%"
    },
    name_div: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }
}))

function FriendRequestData() {
    const { classes } = useStyles();
    return <div className={classes.wrapper}>
        <div className={classes.name_div}>
            <Avatar src={null} alt="Friend request image" />
            <Text size="lg">Name</Text>
        </div>
        <div className={classes.button_div}>
            <ActionIcon variant="outline" color="green"><TiTickOutline size={30} /></ActionIcon>
            <ActionIcon variant="outline" color="red"><ImCross /></ActionIcon>
        </div>
    </div>
}
export default FriendRequestData;