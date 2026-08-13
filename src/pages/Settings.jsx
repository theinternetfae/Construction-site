import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../js files/contexts";
import { saveUserProfile } from "../js files/Storage.js";

function Settings() {

    const location = useLocation();

    const {userProfile, setUserProfile} = useContext(UserContext);

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
            setSubtitleTag('All about your data & privacy');
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
                onClick={() => 
                    setUserProfile(prev => {

                        const profile = {
                            ...prev,
                            themeDark: !prev.themeDark
                        }
            
                        saveUserProfile(profile)
            
                        return profile
                    })
                }>
                    <div className={`mode-toggle-switch ${userProfile.themeDark ? 'translate-x-20 bg-[var(--accent)] text-white' : ''}`}>
                        <i className={`bi ${!userProfile.themeDark ? 'bi-sun' : 'bi-moon'}`}></i>
                    </div>
                </div>
            
            </section>

            <div className="demacator"></div>

            <section className="settings-navigations">
                
                <Link to={"profile"} className={`sett-nav ${location.pathname === '/test/settings/profile' ? 'border-[var(--accent)]' : ""}`}>
                    <i className="bi bi-person md:hidden"></i>
                    <p className="hidden md:block">Profile & Preferences</p>
                </Link>

                <Link to={"history"} className={`sett-nav ${location.pathname === '/test/settings/history' ? 'border-[var(--accent)]' : ""}`}>
                    <i className="bi bi-clock-history md:hidden"></i>
                    <p className="hidden md:block">Task History</p>
                </Link>

                <Link to={"privacy"} className={`sett-nav ${location.pathname === '/test/settings/privacy' ? 'border-[var(--accent)]' : ""}`}>
                    <i className="bi bi-lock md:hidden"></i>
                    <p className="hidden md:block">Data & Privacy</p>
                </Link>

                <Link to={"about"} className={`sett-nav ${location.pathname === '/test/settings/about' ? 'border-[var(--accent)]' : ""}`}>
                    <i className="bi bi-info-circle md:hidden"></i>
                    <p className="hidden md:block">About</p>
                </Link>
                
            </section>
            
            <section className="settings-main">
                <Outlet />
            </section>
        </div>
    );
}

export default Settings;