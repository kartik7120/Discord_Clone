import React from "react";
import { useNavigate } from "react-router-dom";
import UpperHome from "./UpperHome";
import BottomHome from "./BottomHome";
import homeImg from "../images/home_background.webp";
import { BackgroundImage } from "@mantine/core";
import { Button, createStyles } from "@mantine/core";
import MiddleHome from "./MiddleHome";
import { useAuth0 } from "@auth0/auth0-react";
const useStyles = createStyles((theme, _params, getRef) => ({
    home_wrapper: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        backgroundColor: theme.colorScheme === "dark" ? theme.black : theme.white,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    button_class: {
        margin: "2em auto",
    }
}))
function Home() {
    const { isAuthenticated } = useAuth0();
    const { classes } = useStyles();
    const navigate = useNavigate();
    return (
        <div className={classes.home_wrapper}>
            <UpperHome />
            <MiddleHome />
            <Button size="xl" onClick={() => navigate("/")} className={classes.button_class} variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}>Get Started</Button>
            <BottomHome />
        </div>
    )
}
export default Home;