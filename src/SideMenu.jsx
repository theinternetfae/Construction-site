import { Link } from "react-router-dom";

function SideMenu() {
    return ( 
        <nav>
            <div className="sm-nav">

                <section className="nav-sect-sm">
                
                    <Link to={"home"} className="navigation">
                        <i className="bi bi-house-door-fill"></i>
                        <p>Home</p>
                    </Link>

                    <Link to={"stats"} className="navigation">
                        <i className="bi bi-bar-chart"></i>
                        <p className="hidden">Stats</p>
                    </Link>
                    
                    <div className="navigation">
                        <i className="bi bi-clock-history"></i>
                        <p className="hidden">History</p>
                    </div>
                    
                    <div className="navigation">
                        <i className="bi bi-gear"></i>
                        <p className="hidden">Settings</p>
                    </div>

                </section>          


                <section className="quirk-sect-sm">
                    <p className="quirk-level-sm">1</p>
                    <div className="quirk-info-sm">
                        <p>Level One: Rookie</p>
                        <p>0/100</p>
                    </div>
                </section>


            </div>



            <div className="md-lg-nav">

                <section className="logo-sect">
                    <i className="bi bi-check2-circle"></i>
                    <p>Optima</p>
                </section>

                <section className="nav-sect">
                    

                    <Link to={"home"} className="navigation">
                        <i className="bi bi-house-door-fill"></i>
                        <p>Home</p>
                    </Link>

                    <Link to={"stats"} className="navigation">
                        <i className="bi bi-bar-chart"></i>
                        <p>Stats</p>
                    </Link>
                    
                    <div className="navigation">
                        <i className="bi bi-clock-history"></i>
                        <p>History</p>
                    </div>
                    
                    <div className="navigation">
                        <i className="bi bi-gear"></i>
                        <p>Settings</p>
                    </div>
                
                </section>
                
                <section className="quirk-sect">
                    
                    <div className="level-info">
                        <p>Level 1: Rookie</p>
                        <i className="bi bi-info-circle"></i>
                    </div>

                    <div className="level-calc">
                        <p>0/100</p>
                    </div>

                    <div className="level-display">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                </section>

            </div>

        </nav>
    );
}

export default SideMenu;