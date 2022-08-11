import { createStyles, Avatar, Text, ActionIcon } from "@mantine/core";
import { Indicator } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { BsFillGearFill } from "react-icons/bs";
const useStyles = createStyles((theme, _params, getRef) => ({
    Profile_wrapper: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[3] : theme.white,
        width: "100%",
        height: "8%",
        color: "white",
        display: "flex",
        justifyContent: "space-evenly",
        alignContent: "center",
        position: "absolute",
        bottom: 0
    },
    Self_align: {
        alignSelf: "center",
    }
}))
function ProfileComponent() {
    const { user } = useAuth0();
    const { classes } = useStyles();
    return <div className={classes.Profile_wrapper}>
        <Indicator position="bottom-end" inline withBorder offset={6} size={9} color="green">
            <Avatar src={user?.picture} alt="username" size="lg" radius="xl" />
        </Indicator>
        <Text size="sm" className={classes.Self_align}>{user?.name}</Text>
        <ActionIcon variant="light" className={classes.Self_align}><BsFillGearFill /></ActionIcon>
    </div>
}
export default ProfileComponent;