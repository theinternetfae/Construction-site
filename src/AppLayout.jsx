import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

function AppLayout() {
    return ( 
        <div className="overall-main-body">
            <header>
                <SideMenu />
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;