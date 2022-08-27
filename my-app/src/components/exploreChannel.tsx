import { BackgroundImage, Center, createStyles, Image, Text, Container, useMantineTheme } from "@mantine/core";
import { Card, ScrollArea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import fetchChannel from "./interfaces/interfaces";
const useStyles = createStyles((theme, _params, getRef) => ({
    explore_wrapper: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[1] : theme.white,
        width: "100%",
        padding: "0.5em",
        textAlign: "center",
        verticalAlign: "text-bottom",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly"
    },
    channel_container: {
        marginTop: "3em",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridAutoRows: "1fr",
        rowGap: "2em",
    },
    scrollAreaClass: {
        width: "80%",
        height: "100%"
    },
    card_motion: {
        '&:hover': {
            // transform: scale(2,0.5),
            // backgroundColor:theme.fn.darken("#")
        }
    }

}))

async function fetchChannels() {
    const URL = `${process.env.REACT_APP_API_URL}namespace/`;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

function ExploreComponents() {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { isSuccess, data } = useQuery(["namespace", "explore"], fetchChannels)
    return (
        <ScrollArea type="hover" style={{ height: "100vh", width: "100%", padding: 0 }}>
            <div className={classes.explore_wrapper}>
                <BackgroundImage style={{
                    height: "50%",
                    width: "95%",
                    backgroundColor: theme.colors.discord_palette[1],
                    margin: "0 auto"
                }} radius="md" src="https://i.postimg.cc/dtJ6dNhC/discord-explore-background.jpg">
                    <Container size="xl" style={{
                        height: "50%",
                        alignItems: "flex-start"
                    }} fluid>
                        <Center style={{ width: "100%", height: 240 }}>
                            <div>
                                <Text size="xl" color="violet"
                                    weight={600}>Find Your Community</Text>
                                <Text size="xl" color="violet"
                                    weight={600}>From gaming to music , to leaning there's a place for you.</Text>
                            </div>
                        </Center>
                    </Container>
                </BackgroundImage>
                <div className={classes.channel_container}>
                    {
                        isSuccess ? data.map((ele: fetchChannel) => {
                            return (
                                <Card shadow="xl" p="lg" component="a" href="https:://www.google.com" target="_blank" radius="md" withBorder style={{
                                    width: "21em"
                                }}>
                                    <Card.Section>
                                        <Image src="https://i.postimg.cc/Wb5sR5pT/3401963.jpg"
                                            radius="md" alt="Image of the channel" width="100%" height={200} withPlaceholder
                                        />
                                    </Card.Section>
                                    <Text size="lg" align="left" weight="bold" style={{ marginTop: "0.5em" }}>
                                        {ele.channelName}
                                    </Text>
                                    <Text lineClamp={4} align="left" size="sm">
                                        {ele.description}
                                    </Text>
                                </Card>
                            )
                        }) : ""
                    }
                </div>
            </div>
        </ScrollArea>
    )

}
export default ExploreComponents;