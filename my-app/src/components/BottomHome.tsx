import { createStyles, Text, Title } from "@mantine/core"
import { FaReact } from "react-icons/fa";
import { SiMongodb, SiExpress, SiSocketdotio } from "react-icons/si"
import { FaNodeJs } from "react-icons/fa"
const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        margin: "3em"
    },
    icon_wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
}))
function BottomHome() {
    const { classes } = useStyles();

    return <>
        <Text size={60}>Tech Stack Used</Text>
        <div className={classes.wrapper}>
            <div className={classes.icon_wrapper}>
                <FaReact color="cyan" size={100} />
                <Text size="xl">React</Text>
            </div>
            <div className={classes.icon_wrapper}>
                <SiMongodb color="green" size={100} />
                <Text size="xl">MongoDB</Text>
            </div>
            <div className={classes.icon_wrapper}>
                <SiExpress color="grey" size={100} />
                <Text size="xl">Express</Text>
            </div>
            <div className={classes.icon_wrapper}>
                <FaNodeJs color="green" size={100} />
                <Text size="xl">Node JS</Text>
            </div>
            <div className={classes.icon_wrapper}>
                <SiSocketdotio color="grey" size={100} />
                <Text size="xl">Socket IO</Text>
            </div>
        </div>
    </>
}
export default BottomHome