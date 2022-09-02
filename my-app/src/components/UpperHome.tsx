import { Title, createStyles, useMantineTheme, Text, Button, ActionIcon, useMantineColorScheme } from "@mantine/core";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs"
const useStyles = createStyles((theme, _params, getRef) => ({
    upperHomeWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5em",
    },
    bottom_text: {
        width: "50%",
        marginTop: "2em"
    },
    title_text: {
    },
    button_class: {
        marginTop: "2em"
    }
}))
function UpperHome() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const { classes } = useStyles();
    console.log(colorScheme);
    const dark = colorScheme === 'dark';
    return (
        <div className={classes.upperHomeWrapper}>
            <Title order={1} size={100} className={classes.title_text} variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
                Discord_Clone<Text size={50}>(kinda)</Text>
            </Title>
            <Text size="xl" className={classes.bottom_text}>
                ...where you can belong to a school club, a gaming group, or a worldwide art community.
                Where just you and a handful of friends can spend time together. A place that makes it easy to talk every
                day and hang out more often.
            </Text>
            <Button size="xl" className={classes.button_class} variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}>Get Started</Button>
            <ActionIcon
                size="xl"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                onClick={() => toggleColorScheme()}
                title="Toggle light and dark theme">
                {dark ? <BsFillSunFill size={18} /> : <BsFillMoonFill size={18} />}
            </ActionIcon>
        </div>
    )
}
export default UpperHome;