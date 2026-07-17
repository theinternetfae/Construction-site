import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function SideMenu() {

    const [quirkInfoShow, setQuirkInfoShow] = useState(false);

    const location = useLocation();

    useEffect(() => {
        
        if(!quirkInfoShow) return;

        const timer = setTimeout(() => {
            setQuirkInfoShow(false);
        }, 5000)

        return () => clearTimeout(timer)

    }, [quirkInfoShow])

    return ( 
        <nav>
            <div className="sm-nav">

                <section className="nav-sect-sm">
                
                    <Link to={"home"} className={`navigation ${location.pathname === '/test/home' ? 'bg-[#BFDBFE] text-[var(--light-accent)] flex' : ""}`}>
                        <i className="bi bi-house-door-fill"></i>
                        <p className={`${location.pathname === '/test/home' ? 'block' : ""}`}>Home</p>
                    </Link>

                    <Link to={"stats"} className={`navigation ${location.pathname === '/test/stats' ? 'bg-[#BFDBFE] text-[var(--light-accent)] flex' : ""}`}>
                        <i className="bi bi-bar-chart"></i>
                        <p className={`${location.pathname === '/test/stats' ? 'block' : ""}`}>Stats</p>
                    </Link>
                    
                    <div className="navigation">
                        <i className="bi bi-clock-history"></i>
                        <p className={`${location.pathname === '/test/history' ? 'block' : ""}`}>History</p>
                    </div>
                    
                    <div className="navigation">
                        <i className="bi bi-gear"></i>
                        <p className={`${location.pathname === '/test/settings' ? 'block' : ""}`}>Settings</p>
                    </div>

                </section>          


                <section className="quirk-sect-sm" onClick={() => setQuirkInfoShow(!quirkInfoShow)}>
                    <p className="quirk-level-sm">1</p>
                    <div className={`quirk-info-sm ${quirkInfoShow && 'block'}`}>
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
                    

                    <Link to={"home"} className={`navigation ${location.pathname === '/test/home' ? 'bg-[#BFDBFE] text-[var(--light-accent)]' : ""}`}>
                        <i className="bi bi-house-door-fill"></i>
                        <p>Home</p>
                    </Link>

                    <Link to={"stats"} className={`navigation ${location.pathname === '/test/stats' ? 'bg-[#BFDBFE] text-[var(--light-accent)]' : ""}`}>
                        <i className="bi bi-bar-chart"></i>
                        <p>Stats</p>
                    </Link>
                    
                    <div className={`navigation ${location.pathname === '/test/history' ? 'bg-[#BFDBFE] text-[var(--light-accent)]' : ""}`}>
                        <i className="bi bi-clock-history"></i>
                        <p>History</p>
                    </div>
                    
                    <div className={`navigation ${location.pathname === '/test/settings' ? 'bg-[#BFDBFE] text-[var(--light-accent)]' : ""}`}>
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