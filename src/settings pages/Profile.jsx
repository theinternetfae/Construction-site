import { useState, useContext, useEffect } from "react";
import { UserContext } from "../js files/contexts";
import user from "../appwrite files/accounts";
import Alert from "../utilities jsx/Alert";

function Profile() {

    const { userProfile, setUserProfile, getUser } = useContext(UserContext);

    useEffect(() => {
        console.log(userProfile)
    }, [userProfile])

    // function setPfpImage(e) {
    //     const file = e.target.files[0];

    //     const imageUrl = URL.createObjectURL(file);

    //     console.log(imageUrl);
    //     setUserProfile(prev => {
    //         const profile = {
    //             ...prev, 
    //             pfp: imageUrl
    //         }

    //         return profile;
    //     });
    // }

    function setPfpImage(e) {
        const file = e.target.files[0];

        const reader = new FileReader();
        
        reader.onload = () => {
            const imageUrl = reader.result;

            setUserProfile(prev => {
                const profile = {
                    ...prev, 
                    pfp: imageUrl
                }

                return profile;
            });
        };

        reader.readAsDataURL(file);
        console.log(reader);
    }

    const [logoutAlert, setLogoutAlert] = useState(false);

    async function logout() {
        try {
            await user.logout();
            setUserProfile(null);
        } catch (error) {
            console.log("Logout error:", error);
        }
    }

    return (  
        <div className="profile">
            
            <section className="user-display">

                <label className="pfp-cont">
                    {userProfile?.pfp ? 
                        <img src={userProfile.pfp} alt="your pfp" className="pfp"/> 
                    :
                        <i className="bi bi-plus-lg"></i>
                    }

                    <input type="file" 
                        accept="image/*"
                        onChange={setPfpImage}
                        hidden
                    />
                </label>
            
                <div className="name-email">
                    <span>{userProfile?.name}</span>
                    <span>{userProfile?.email}</span>
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
                    
                                return profile
                            })
                        } className={`${userProfile?.prefs.accent === 'blue' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="blue"></span>
                        </div>



                        <div onClick={() => 
                            setUserProfile(prev => {

                                const profile = {
                                    ...prev,
                                    accent: 'purple'
                                }
                
                    
                                return profile
                            })
                        } className={`${userProfile?.prefs.accent === 'purple' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="purple"></span>
                        </div>
                        


                        <div onClick={() => 
                            setUserProfile(prev => {

                                const profile = {
                                    ...prev,
                                    accent: 'pink'
                                }
                    
                    
                                return profile
                            })
                        } className={`${userProfile?.prefs.accent === 'pink' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="pink"></span>
                        </div>



                        <div onClick={() => 
                            setUserProfile(prev => {

                                const profile = {
                                    ...prev,
                                    accent: 'green'
                                }
                    
                    
                                return profile
                            })
                        } className={`${userProfile?.prefs.accent === 'green' ? 'border-[var(--accent)]' : ''}`}>
                            <span className="green"></span>
                        </div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Optima quirk</p>
                    <div className={`pref-toggle ${userProfile?.prefs.quirk ? 'bg-[var(--accent)]' : ''}`} 
                    onClick={() => 

                        setUserProfile(prev => {

                            const profile = {
                                ...prev,
                                quirk: !prev.quirk
                            }
                   
                   
                            return profile
                        })
                    
                    }>
                        <div className={`pref-toggle-switch ${userProfile?.prefs.quirk ? 'translate-x-24':''}`}></div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Daily quote</p>
                    <div className={`pref-toggle ${userProfile?.prefs.quote ? 'bg-[var(--accent)]' : ''}`} 
                    onClick={() => 
                        setUserProfile(prev => {

                            const profile = {
                                ...prev,
                                quote: !prev.quote
                            }
                   
                   
                            return profile
                        })
                    }>
                        <div className={`pref-toggle-switch ${userProfile?.prefs.quote ? 'translate-x-24':''}`}></div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Streak</p>
                    <div className={`pref-toggle ${userProfile?.prefs.streak ? 'bg-[var(--accent)]' : ''}`} 
                    onClick={() => 
                        setUserProfile(prev => {

                            const profile = {
                                ...prev,
                                streak: !prev.streak
                            }
                   
                   
                            return profile
                        })
                    }>
                        <div className={`pref-toggle-switch ${userProfile?.prefs.streak ? 'translate-x-24':''}`}></div>
                    </div>
                </div>
            
            </section>

            <div className="demacator"></div>

            <section className="account-commands">
                
                <div className="command">
                    <p>Log out</p>
                    <button className="log-out" onClick={() => setLogoutAlert(true)}>
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

            {
                logoutAlert && <Alert
                    text={"Are you sure you want to log out?"}
                    buttonTextOne={"Stay"}
                    buttonActionOne={() => setLogoutAlert(false)}
                    buttonTextTwo={"Leave"}
                    buttonActionTwo={() => logout()}
                />
            }
        
        </div>
    );
}

export default Profile;