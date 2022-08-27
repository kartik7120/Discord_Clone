import { BackgroundImage, Center, createStyles, Image, Text, Container, useMantineTheme } from "@mantine/core";
import { Card } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import fetchChannel from "./interfaces/interfaces";
const useStyles = createStyles((theme, _params, getRef) => ({
    explore_wrapper: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[1] : theme.white,
        width: "100%",
        padding: "1em",
        textAlign: "center",
        verticalAlign: "text-bottom",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly"
    },
    channel_container: {
        marginTop: "3em",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridAutoRows: "1fr"
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
    const { isLoading, isError, error, isSuccess, data } = useQuery(["namespace", "explore"], fetchChannels)
    return <div className={classes.explore_wrapper}>
        <BackgroundImage style={{
            height: "50%",
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
            <Card shadow="xl" p="lg" component="a" href="https:://www.google.com" target="_blank" radius="md" withBorder style={{
                width: "21em"
            }}>
                <Card.Section>
                    <Image src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                        radius="md" alt="Image of the channel" width="100%" height={200} withPlaceholder
                    />
                </Card.Section>
                <Text size="lg" align="left" weight="bold" style={{ marginTop: "0.5em" }}>
                    Death Note
                </Text>
                <Text lineClamp={4} align="left" size="sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, consequatur iste placeat repudiandae suscipit consequuntur impedit nihil perspiciatis neque deleniti? Consequatur dolorem dolor incidunt assumenda temporibus. Iste totam voluptates amet!
                    Saepe ipsum sapiente quam culpa nam praesentium eligendi id eum laudantium minima? Similique consectetur, nesciunt rerum error, numquam velit, optio ipsa blanditiis nostrum sapiente molestias iure laborum quisquam itaque beatae!
                    Atque numquam harum similique voluptates accusantium consequatur quis consequuntur qui dolorum reiciendis quasi cumque quisquam, excepturi quidem suscipit adipisci nobis consectetur hic, minima eligendi inventore nemo tempore! Unde, officiis nam!
                    Facilis veritatis quod esse sequi officiis nobis voluptas? Optio cupiditate corporis eum cum reprehenderit, itaque iste commodi aspernatur dolorem numquam exercitationem voluptatibus molestias distinctio dicta nam obcaecati, reiciendis in provident!
                    Excepturi pariatur non quod. Ipsam molestiae incidunt quasi quos iure nihil cupiditate quidem tenetur consequuntur mollitia iusto quo eos amet dolor optio necessitatibus, sunt facere deserunt iste esse id veritatis.
                </Text>
            </Card>
        </div>
    </div>
}
export default ExploreComponents;