import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../js files/contexts";

function Settings() {

    const location = useLocation();

    const {theme, setTheme} = useContext(ThemeContext);

    const [headerTag, setHeaderTag] = useState('Profile & Preferences');
    const [subtitleTag, setSubtitleTag] = useState('Manage your profile and preferences');

    useEffect(() => {
        
        if(location.pathname === '/test/settings/profile') {
            setHeaderTag('Profile & Preferences');
            setSubtitleTag('Manage your profile and preferences');
        }

        if(location.pathname === '/test/settings/history') {
            setHeaderTag('Task History');
            setSubtitleTag('View your task history');
        }

        if(location.pathname === '/test/settings/privacy') {
            setHeaderTag('Data & Privacy');
            setSubtitleTag('All about your data');
        }

        if(location.pathname === '/test/settings/about') {
            setHeaderTag('About');
            setSubtitleTag('Learn more about us!');
        }

    }, [location])


    return ( 
        <div className="settings">

            <section className="heading">

                <div className="page-info">
                    <h2>Settings <span className="hidden md:block">{` > ${headerTag}`}</span></h2>
                    <p>{subtitleTag}</p>
                </div>

                <div className="mode-toggle" 
                onClick={() => {
                    setTheme(prev => !prev);
                }}>
                    <div className={`mode-toggle-switch ${theme ? 'translate-x-20 bg-[var(--accent)] text-white' : ''}`}>
                        <i className={`bi ${!theme ? 'bi-sun' : 'bi-moon'}`}></i>
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