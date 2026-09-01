import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useMemo } from "react";
import { TaskContext, UserContext } from "./js files/contexts";

function SideMenu() {

    const {level, generalCirlceProgress} = useContext(TaskContext);
    const {userProfile} = useContext(UserContext);

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

    useEffect(() => {
        let name = location.pathname;

        if (name !== '/interior/stats' && name !== '/interior/home') {
            name = '/interior/settings';
        }

        setLoName(name);
    }, [location])

    const smLevel = useMemo(() => {
        
        const levelMessage = level === 1 ? "Level One: Rookie" : level === 2 ? "Level Two: Student" : level === 3 ? "Level Three: Master" : '';

        const furtherMessage = level === 1 ? 4 : level === 2 ? 8 : level === 3 ? 10 : '';

        return {
            lvlM: levelMessage,
            ftrM: furtherMessage
        }
    }, [generalCirlceProgress])

    return ( 
        <nav>
            <div className="sm-nav">

                <section className="nav-sect-sm">
                
                    <Link to={"home"} className={`navigation ${loName === '/interior/home' ? 'bg-[var(--muted-accent)] text-[var(--accent)] flex' : ""}`}>
                        <i className="bi bi-house-door-fill"></i>
                        <p className={`${loName === '/interior/home' ? 'block' : ""}`}>Home</p>
                    </Link>

                    <Link to={"stats"} className={`navigation ${loName === '/interior/stats' ? 'bg-[var(--muted-accent)] text-[var(--accent)] flex' : ""}`}>
                        <i className="bi bi-bar-chart"></i>
                        <p className={`${loName === '/interior/stats' ? 'block' : ""}`}>Stats</p>
                    </Link>

                    <Link to={"settings"} className={`navigation ${loName === '/interior/settings' ? 'bg-[var(--muted-accent)] text-[var(--accent)] flex' : ""}`}>
                        <i className="bi bi-gear"></i>
                        <p className={`${loName === '/interior/settings' ? 'block' : ""}`}>Settings</p>
                    </Link>

                </section>          


                <section className={`quirk-sect-sm ${userProfile?.prefs.quirk ? '' : 'hidden'}`} onClick={() => setQuirkInfoShow(!quirkInfoShow)}>
                    <p className="quirk-level-sm">{level}</p>
                    <div className={`quirk-info-sm ${quirkInfoShow && 'block'}`}>
                        <p>{smLevel.lvlM}</p>
                        <p className="level-calc">Daily task limit: {smLevel.ftrM}</p>
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

                        <Link to={"home"} className={`navigation ${loName === '/interior/home' ? 'bg-[var(--muted-accent)] text-[var(--accent)]' : ""}`}>
                            <i className="bi bi-house-door-fill"></i>
                            <p>Home</p>
                        </Link>

                        <Link to={"stats"} className={`navigation ${loName === '/interior/stats' ? 'bg-[var(--muted-accent)] text-[var(--accent)]' : ""}`}>
                            <i className="bi bi-bar-chart"></i>
                            <p>Stats</p>
                        </Link>

                        <Link to={"settings"} className={`navigation ${loName === '/interior/settings' ? 'bg-[var(--muted-accent)] text-[var(--accent)]' : ""}`}>
                            <i className="bi bi-gear"></i>
                            <p>Settings</p>
                        </Link>
                                        
                    </section>
                
                </section>
                
                <section className={`quirk-sect ${userProfile?.prefs.quirk ? '' : 'hidden'}`}>
                    
                    <div className="level-info">
                        <p>{smLevel.lvlM}</p>
                        <i className="bi bi-info-circle"></i>
                    </div>

                    <div className="level-calc">
                        <p className={`${level === 3 ? 'text-[var(--yellow)]' : ''}`}>Daily task limit: {smLevel.ftrM}</p>
                    </div>

                    <div className="level-display">
                        <span className={`${level === 1 || level === 2 || level === 3 ? 'bg-[var(--accent)]' : ''}`}></span>
                        <span className={`${level === 2 || level === 3 ? 'bg-[var(--accent)]' : ''}`}></span>
                        <span className={`${level === 3 ? 'bg-[var(--accent)]' : ''}`}></span>
                    </div>

                </section>

            </div>

        </nav>
    );
}

export default SideMenu;