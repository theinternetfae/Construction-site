import { Link } from "react-router-dom";

function SideMenu() {
    return ( 
        <nav>
            <section className="logo-sect">
                <i class="bi bi-check2-circle"></i>
                <p>Optima</p>
            </section>

            <section className="nav-sect">
                

                <Link to={"home"} className="navigation">
                    <i class="bi bi-house-door-fill"></i>
                    <p>Home</p>
                </Link>

                <Link to={"stats"} className="navigation">
                    <i class="bi bi-bar-chart"></i>
                    <p>Stats</p>
                </Link>
                
                <div className="navigation">
                    <i class="bi bi-clock-history"></i>
                    <p>History</p>
                </div>
                
                <div className="navigation">
                    <i class="bi bi-gear"></i>
                    <p>Settings</p>
                </div>
            
            </section>
            
            <section className="quirk-sect">
                
                <div className="level-info">
                    <p>Level 1: Rookie</p>
                    <i class="bi bi-info-circle"></i>
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
        </nav>
    );
}

export default SideMenu;