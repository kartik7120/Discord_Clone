import { Title, createStyles, useMantineTheme, Text } from "@mantine/core";
const useStyles = createStyles((theme, _params, getRef) => ({
    upperHomeWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5em"
        // color: theme.colorScheme === "dark" ? theme.white : theme.black
    },
    bottom_text: {
        width: "50%",
        marginTop: "2em"
    },
    title_text: {
    }
}))
function UpperHome() {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return (
        <div className={classes.upperHomeWrapper}>
            <Title order={1} size={100} className={classes.title_text} variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
                Discord_Clone<Text size={50}>(kinda)</Text>
            </Title>
            <Text size="xl" className={classes.bottom_text}>
                ...where you can belong to a school club, a gaming group, or a worldwide art community.
                Where just you and a handful of friends can spend time together. A place that makes it easy to talk every
                day and hang out more often.
            </Text>
        </div>
    )
}
export default UpperHome;