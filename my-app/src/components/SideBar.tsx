import { SiDiscord } from "react-icons/si";
import { FaCompass } from "react-icons/fa";
import { BsPlus, BsFillLightningFill } from "react-icons/bs"

function SideBar() {
    return <div className="sidebar">
        <SidebarIcon icon={<SiDiscord size={32} color={"#5663F7"} />} />
        <SidebarIcon icon={<BsPlus size={32} />} />
        <SidebarIcon icon={<BsFillLightningFill size={20} />} />
        <SidebarIcon icon={<FaCompass size="20" />} />
    </div>
}

function SidebarIcon({ icon }: any) {
    return <div className="sidebar-icon">
        {icon}
    </div>
}
export default SideBar;