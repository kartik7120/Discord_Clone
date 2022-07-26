import LeftColumn from "./LeftColumn";
import { createStyles } from "@mantine/core";
import { Outlet } from "react-router-dom";
const useStyles = createStyles((theme, _params, getRef) => ({
    grid_wrapper: {
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr) minmax(0,1fr)",
        width: "100%",
        height: "100vh"
    }
}))
function Channel() {
    const { classes } = useStyles();
    return <div className={classes.grid_wrapper}>
        <LeftColumn />
        <Outlet />
    </div>
}
export default Channel;