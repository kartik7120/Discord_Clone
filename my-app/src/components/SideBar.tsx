import { SiDiscord } from "react-icons/si";
import { SiMyanimelist } from "react-icons/si";
import { FaCompass } from "react-icons/fa";
import { BsPlus, BsFillLightningFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Box } from "@mantine/core";
import { Tooltip } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import React from "react";
function SideBar() {
    const theme = useMantineTheme();
    return <div className="sidebar">
        <Tooltip label="Home" position="right" placement="center" gutter={7} withArrow arrowSize={5}
            styles={{
                body: { color: theme.colors.gray[0], fontSize: theme.fontSizes.md, fontWeight: "bold" }
            }}
        >
            <SidebarIcon icon={<SiDiscord size={32} color={"#5663F7"} />} label="Home" />
        </Tooltip>
        <Tooltip label="Add a Server" position="right" placement="center" gutter={7} withArrow arrowSize={5}
            styles={{
                body: { color: theme.colors.gray[0], fontSize: theme.fontSizes.md, fontWeight: "bold" }
            }}
        >
            <SidebarIcon icon={<BsPlus size={32} />} />
        </Tooltip>
        <Tooltip label="Home" position="right" placement="center" gutter={7} withArrow arrowSize={5}
            styles={{
                body: { color: theme.colors.gray[0], fontSize: theme.fontSizes.md, fontWeight: "bold" }
            }}
        >
            <SidebarIcon icon={<BsFillLightningFill size={20} />} />
        </Tooltip>
        <Tooltip label="Explore Servers" position="right" placement="center" gutter={7} withArrow arrowSize={5}
            styles={{
                body: { color: theme.colors.gray[0], fontSize: theme.fontSizes.md, fontWeight: "bold" }
            }}
        >
            <SidebarIcon icon={<FaCompass size="20" />} />
        </Tooltip>
        <Tooltip label="MyAnimeList" position="right" placement="center" gutter={7} withArrow arrowSize={5}
            styles={{
                body: { color: theme.colors.gray[0], fontSize: theme.fontSizes.md, fontWeight: "bold" }
            }}
        >
            <SidebarIcon icon={<SiMyanimelist size="20" />} label="channel" />
        </Tooltip>
    </div>
}

function SidebarIcon({ icon, label }: any) {
    const navigate = useNavigate();
    function handleClick() {
        if (label && label !== "Home")
            navigate(`/${label}`);
        else
            navigate("../");
    }
    return <Box component="div" className="sidebar-icon" onClick={handleClick}>
        {icon}
    </Box>
}
export default SideBar;