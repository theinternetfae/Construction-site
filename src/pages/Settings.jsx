import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

function Settings() {

    const location = useLocation();

    return ( 
        <div className="settings">

            <section className="heading">

                <div className="page-info">
                    <h2>Settings <span>{`>`} Profile & Preferences</span></h2>
                    <p>Manage your account settings</p>
                </div>

                <div className="mode-toggle">
                    <div className="mode-toggle-switch">
                        <i className="bi bi-sun"></i>
                        {/* <i class="bi bi-moon"></i> */}
                    </div>
                </div>
            
            </section>

            <div className="demacator"></div>

            <section className="settings-navigations">
                
                <Link to={"profile"} className={`sett-nav ${location.pathname === '/test/settings/profile' ? 'border-[var(--accent)]' : ""}`}>
                    <p>Profile & Preferences</p>
                </Link>

                <Link to={"history"} className={`sett-nav ${location.pathname === '/test/settings/history' ? 'border-[var(--accent)]' : ""}`}>
                    <p>Task History</p>
                </Link>

                <Link to={"privacy"} className={`sett-nav ${location.pathname === '/test/settings/privacy' ? 'border-[var(--accent)]' : ""}`}>
                    <p className="sett-nav">Data & Privacy</p>
                </Link>

                <Link to={"about"} className={`sett-nav ${location.pathname === '/test/settings/about' ? 'border-[var(--accent)]' : ""}`}>
                    <p className="sett-nav">About</p>
                </Link>
                
            </section>
            
            <section className="settings-main">
                <Outlet />
            </section>
        </div>
    );
}

export default Settings;