import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

function AppLayout() {
    return ( 
        <div className="overall-main-body">
            <SideMenu />

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;