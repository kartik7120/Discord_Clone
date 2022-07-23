// import { Grid, SimpleGrid } from "@mantine/core";
import LeftColumn from "./LeftColumn";
import MiddleColumn from "./MiddleColumn";
import RightColumn from "./RightColumn";
import { createStyles } from "@mantine/core";
// import { ScrollArea } from "@mantine/core";
const useStyles = createStyles((theme, _params, getRef) => ({
    grid_wrapper: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        width: "100%",
        height: "100vh"
    }
}))
function Channel() {
    const { classes } = useStyles();
    return <div className={classes.grid_wrapper}>
        <LeftColumn />
        <MiddleColumn />
        <RightColumn />
    </div>
}
export default Channel;