import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

function AppLayout() {
    return ( 
        <div className="overall-main-body">
            <SideMenu />
        </div>
    );
}

export default AppLayout;