import { Button, createStyles, Text } from "@mantine/core";
import img1 from "../images/disImg1.svg";
import img2 from "../images/disImg2.svg";
const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        display: "column",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    flexClass: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    inner_div: {
        width: "30%"
    },
}))
function MiddleHome() {
    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.flexClass}>
                <img src={img1} alt="discord 1" />
                <div className={classes.inner_div}>
                    <Text size={50}>Join Rooms Only Where You Belong</Text>
                    <Text size="xl">
                        Discord servers are organized into topic-based channels where
                        you can collaborate, share, and just talk about your day without
                        clogging up a group chat.
                    </Text>
                </div>
            </div>
            <div className={classes.flexClass}>
                <div className={classes.inner_div} style={{alignSelf:"flex-end"}}>
                    <Text size={50}>From few to a fandom</Text>
                    <Text size={20}>
                        Join any community running from the explore tab that matches your intrest and style
                    </Text>
                </div>
                <img src={img2} alt="discord 2" />
            </div>
            
        </div>
    )

}
export default MiddleHome;