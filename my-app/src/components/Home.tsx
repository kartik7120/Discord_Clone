import React from "react"
import UpperHome from "./UpperHome";
import { Button, createStyles } from "@mantine/core";
import MiddleHome from "./MiddleHome";
const useStyles = createStyles((theme, _params, getRef) => ({
    home_wrapper: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        backgroundColor: theme.colorScheme === "dark" ? theme.black : theme.white,
        display: "flex",
        flexDirection: "column"
    },
    button_class: {
        margin: "2em auto"
    }

}))
function Home() {
    const { classes } = useStyles();
    return (
        <div className={classes.home_wrapper}>
            <UpperHome />
            <MiddleHome />
            <Button size="xl" className={classes.button_class} variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}>Get Started</Button>
        </div>
    )
}
export default Home;