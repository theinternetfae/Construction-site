import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./js files/contexts";

function SideMenu() {

    const {quirk} = useContext(UserContext);

    const [quirkInfoShow, setQuirkInfoShow] = useState(false);

    const location = useLocation();

    useEffect(() => {
        
        if(!quirkInfoShow) return;

        const timer = setTimeout(() => {
            setQuirkInfoShow(false);
        }, 5000)

        return () => clearTimeout(timer)

    }, [quirkInfoShow])


    const [loName, setLoName] = useState('');
    const [loNameSett, setLoNameSett] = useState(false);

    useEffect(() => {
        let name = location.pathname;

        if (name !== '/test/stats' && name !== '/test/home') {
            name = '/test/settings';
        }

        setLoName(name);
    }, [location])

    return ( 
        <nav>
            <div className="sm-nav">

                <section className="nav-sect-sm">
                
                    <Link to={"home"} className={`navigation ${loName === '/test/home' ? 'bg-[var(--muted-accent)] text-[var(--accent)] flex' : ""}`}>
                        <i className="bi bi-house-door-fill"></i>
                        <p className={`${loName === '/test/home' ? 'block' : ""}`}>Home</p>
                    </Link>

                    <Link to={"stats"} className={`navigation ${loName === '/test/stats' ? 'bg-[var(--muted-accent)] text-[var(--accent)] flex' : ""}`}>
                        <i className="bi bi-bar-chart"></i>
                        <p className={`${loName === '/test/stats' ? 'block' : ""}`}>Stats</p>
                    </Link>

                    <Link to={"settings"} className={`navigation ${loName === '/test/settings' ? 'bg-[var(--muted-accent)] text-[var(--accent)] flex' : ""}`}>
                        <i className="bi bi-gear"></i>
                        <p className={`${loName === '/test/settings' ? 'block' : ""}`}>Settings</p>
                    </Link>

                </section>          


                <section className={`quirk-sect-sm ${!quirk ? 'hidden' : ''}`} onClick={() => setQuirkInfoShow(!quirkInfoShow)}>
                    <p className="quirk-level-sm">1</p>
                    <div className={`quirk-info-sm ${quirkInfoShow && 'block'}`}>
                        <p>Level One: Rookie</p>
                        <p>0/100</p>
                    </div>
                </section>

            </div>



            <div className="md-lg-nav">

                <section>

                    <section className="logo-sect">
                        <i className="bi bi-check2-circle"></i>
                        <p>Optima</p>
                    </section>

                    <section className="nav-sect">

                        <Link to={"home"} className={`navigation ${loName === '/test/home' ? 'bg-[var(--muted-accent)] text-[var(--accent)]' : ""}`}>
                            <i className="bi bi-house-door-fill"></i>
                            <p>Home</p>
                        </Link>

                        <Link to={"stats"} className={`navigation ${loName === '/test/stats' ? 'bg-[var(--muted-accent)] text-[var(--accent)]' : ""}`}>
                            <i className="bi bi-bar-chart"></i>
                            <p>Stats</p>
                        </Link>

                        <Link to={"settings"} className={`navigation ${loName === '/test/settings' ? 'bg-[var(--muted-accent)] text-[var(--accent)]' : ""}`}>
                            <i className="bi bi-gear"></i>
                            <p>Settings</p>
                        </Link>
                                        
                    </section>
                
                </section>
                
                <section className={`quirk-sect ${!quirk ? 'hidden' : ''}`}>
                    
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