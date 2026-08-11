import { useState, useContext } from "react";
import { ThemeContext, UserContext } from "../js files/contexts";
import { saveUserProfile } from "../js files/Storage.js";

function Profile() {

    const { userProfile, setUserProfile} = useContext(UserContext);

    const [quoteToggle, setQuoteToggle] = useState(false);

    return (  
        <div className="profile">
            
            <section className="user-display">

                <div className="pfp-cont">
                    <i className="bi bi-plus-lg"></i>
                </div>
            
                <div className="name-email">
                    <span>{userProfile.name}</span>
                    <span>{userProfile.email}</span>
                </div>
            
            </section>

            <div className="demacator"></div>
            
            <section className="user-preferences">

                <div className="user-pref">
                    <p>Themes</p>

                    <div className="theme-array">


                        <div onClick={() => 
                            setUserProfile(prev => {

                                const profile = {
                                    ...prev,
                                    accent: 'blue'
                                }
                    
                                saveUserProfile(profile)
                    
                                return profile
                            })
                        } className={`${userProfile.accent === 'blue' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="blue"></span>
                        </div>



                        <div onClick={() => 
                            setUserProfile(prev => {

                                const profile = {
                                    ...prev,
                                    accent: 'purple'
                                }
                    
                                saveUserProfile(profile)
                    
                                return profile
                            })
                        } className={`${userProfile.accent === 'purple' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="purple"></span>
                        </div>
                        


                        <div onClick={() => 
                            setUserProfile(prev => {

                                const profile = {
                                    ...prev,
                                    accent: 'pink'
                                }
                    
                                saveUserProfile(profile)
                    
                                return profile
                            })
                        } className={`${userProfile.accent === 'pink' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="pink"></span>
                        </div>



                        <div onClick={() => 
                            setUserProfile(prev => {

                                const profile = {
                                    ...prev,
                                    accent: 'green'
                                }
                    
                                saveUserProfile(profile)
                    
                                return profile
                            })
                        } className={`${userProfile.accent === 'green' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="green"></span>
                        </div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Optima quirk</p>
                    <div className={`pref-toggle ${userProfile.quirk ? 'bg-[var(--accent)]' : ''}`} 
                    onClick={() => 

                        setUserProfile(prev => {

                            const profile = {
                                ...prev,
                                quirk: !prev.quirk
                            }
                   
                            saveUserProfile(profile)
                   
                            return profile
                        })
                    
                    }>
                        <div className={`pref-toggle-switch ${userProfile.quirk ? 'translate-x-25':''}`}></div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Daily quote</p>
                    <div className={`pref-toggle ${userProfile.quote ? 'bg-[var(--accent)]' : ''}`} 
                    onClick={() => 
                        setUserProfile(prev => {

                            const profile = {
                                ...prev,
                                quote: !prev.quote
                            }
                   
                            saveUserProfile(profile)
                   
                            return profile
                        })
                    }>
                        <div className={`pref-toggle-switch ${userProfile.quote ? 'translate-x-25':''}`}></div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Streak</p>
                    <div className={`pref-toggle ${userProfile.streak ? 'bg-[var(--accent)]' : ''}`} 
                    onClick={() => 
                        setUserProfile(prev => {

                            const profile = {
                                ...prev,
                                streak: !prev.streak
                            }
                   
                            saveUserProfile(profile)
                   
                            return profile
                        })
                    }>
                        <div className={`pref-toggle-switch ${userProfile.streak ? 'translate-x-25':''}`}></div>
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