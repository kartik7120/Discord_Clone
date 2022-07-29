import { createStyles, Text } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
const useStyles = createStyles((theme, _param, getRef) => ({
    accordian_class: {
        '&:hover': {
            backgroundColor: theme.fn.darken(theme.colors.discord_palette[5], 0.1)
        },
        width: "90%"
    }
}))
function GroupChannel() {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return <Accordion order={4} className={classes.accordian_class}>
        <Accordion.Item label={<Text color={theme.colors.discord_palette[6]}>Anime</Text>} >
            All anime category
        </Accordion.Item>
    </Accordion>
}
export default GroupChannel;