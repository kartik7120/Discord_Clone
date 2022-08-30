import { BackgroundImage, Center, createStyles, Image, Text, Container, useMantineTheme } from "@mantine/core";
import { Card, ScrollArea } from "@mantine/core";
import { QueryClient, useQuery } from "@tanstack/react-query";
import fetchChannel from "./interfaces/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
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
    card_class: {
        '&:hover': {
            backgroundColor: theme.fn.darken("#2b2e33", 0.5),
            cursor: "pointer"
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

function handleClick(id: string, navigate: any, channelName: string,
    setOpened: React.Dispatch<React.SetStateAction<boolean>>, currLocation: string, queryClient: QueryClient,
    userId: string | undefined
) {
    setOpened(true);
    const channels: fetchChannel[] | undefined = queryClient.getQueryData(["channels", userId])
    if (channels !== undefined) {
        const channel = channels.find((ele) => {
            return ele._id === id
        })
        if (channel) {
            return navigate(`/${channelName}/${id}`, {
                state: false
            });
        }
    }
    navigate(`/${channelName}/${id}`, {
        state: true
    });
}

function ExploreComponents() {
    const { user } = useAuth0();
    const queryClient = useQueryClient()
    const location = useLocation();
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { isSuccess, data } = useQuery(["namespace", "explore"], fetchChannels);
    return (
        <>
            <div className={classes.explore_wrapper}>
                <ScrollArea type="hover" style={{ height: "100vh", width: "100%", padding: 0, margin: 0 }}>
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
                            isSuccess ? data.map((ele: fetchChannel, index: number) => {
                                return (
                                    <Card shadow="xl" key={Math.random() * 456 * index}
                                        onClick={() => handleClick(ele._id, navigate, ele.channelName, setOpened,
                                            location.pathname, queryClient, user?.sub)} p="lg"
                                        className={classes.card_class}
                                        radius="md" withBorder style={{
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
                </ScrollArea>
            </div>
        </>
    )

}
export default ExploreComponents;