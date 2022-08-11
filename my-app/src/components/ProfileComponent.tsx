import { createStyles, Avatar, Text, ActionIcon } from "@mantine/core";
import { Indicator } from "@mantine/core";
import { BsFillGearFill } from "react-icons/bs";
const useStyles = createStyles((theme, _params, getRef) => ({
    Profile_wrapper: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[3] : theme.white,
        width: "100%",
        height: "8%",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignContent: "space-evenly"
    },
    Self_align: {
        alignSelf: "center",
    }
}))
function ProfileComponent() {
    const { classes } = useStyles();
    return <div className={classes.Profile_wrapper}>
        <Indicator position="bottom-end" inline offset={10} size={9} color="green">
            <Avatar src={null} alt="No image is here" size="lg" />
        </Indicator>
        <Text size="sm" className={classes.Self_align}>Username</Text>
        <ActionIcon variant="outline" className={classes.Self_align}><BsFillGearFill /></ActionIcon>
    </div>
}
export default ProfileComponent;