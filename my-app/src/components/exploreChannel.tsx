import { BackgroundImage, Center, createStyles, Image, Text, Container, useMantineTheme } from "@mantine/core";
import { Card } from "@mantine/core";
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
    }
}))

function ExploreComponents() {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return <div className={classes.explore_wrapper}>
        <BackgroundImage style={{
            height: "50%",
        }} radius="md" src="https://i.postimg.cc/dtJ6dNhC/discord-explore-background.jpg">
            <Container size="xl" style={{
                height: "50%"
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
        <div>
            <Card shadow="xl" p="lg" radius="md" withBorder>
                <Card.Section>
                    <Image src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                        radius="md" alt="Image of the channel" width={200} height={80} withPlaceholder
                    />
                </Card.Section>
            </Card>
        </div>
    </div>
}
export default ExploreComponents;