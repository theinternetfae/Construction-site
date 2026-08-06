import { useState, useContext } from "react";
import { ThemeContext } from "../js files/contexts";

function Profile() {

    const {themeAccent, setThemeAccent} = useContext(ThemeContext);

    const [quirkToggle, setQuirkToggle] = useState(true);
    const [quoteToggle, setQuoteToggle] = useState(false);
    const [streakToggle, setStreakToggle] = useState(false);

    return (  
        <div className="profile">
            
            <section className="user-display">

                <div className="pfp-cont">
                    <i className="bi bi-plus-lg"></i>
                </div>
            
                <div className="name-email">
                    <span>Jane Doe</span>
                    <span>janedoe@gmail.com</span>
                </div>
            
            </section>

            <div className="demacator"></div>
            
            <section className="user-preferences">

                <div className="user-pref">
                    <p>Themes</p>

                    <div className="theme-array">
                        <div onClick={() => setThemeAccent('blue')} className={`${themeAccent === 'blue' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="blue"></span>
                        </div>

                        <div onClick={() => setThemeAccent('purple')} className={`${themeAccent === 'purple' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="purple"></span>
                        </div>
                        
                        <div onClick={() => setThemeAccent('pink')} className={`${themeAccent === 'pink' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="pink"></span>
                        </div>

                        <div onClick={() => setThemeAccent('green')} className={`${themeAccent === 'green' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="green"></span>
                        </div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Optima quirk</p>
                    <div className="pref-toggle" onClick={() => setQuirkToggle(prev => !prev)}>
                        <div className={`pref-toggle-switch ${quirkToggle ? 'translate-x-25':''}`}></div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Daily quote</p>
                    <div className="pref-toggle" onClick={() => setQuoteToggle(prev => !prev)}>
                        <div className={`pref-toggle-switch ${quoteToggle ? 'translate-x-25':''}`}></div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Streak</p>
                    <div className="pref-toggle" onClick={() => setStreakToggle(prev => !prev)}>
                        <div className={`pref-toggle-switch ${streakToggle ? 'translate-x-25':''}`}></div>
                    </div>
                </div>
            
            </section>

            <div className="demacator"></div>

            <section className="account-commands">
                
                <div className="command">
                    <p>Log out</p>
                    <button className="log-out">
                        <i className="bi bi-person-walking"></i>
                    </button>
                </div>

                <div className="command">
                    <p>Delete account</p>
                    <button className="delete-account">
                        <i className="bi bi-person-x-fill"></i>
                    </button>
                </div>
            
            </section>
        
        </div>
    );
}

export default Profile;