import { useState, useContext, useEffect } from "react";
import { UserContext } from "../js files/contexts";
import user from "../appwrite files/accounts";
import Alert from "../utilities jsx/Alert";
import str from "../appwrite files/storage";

function Profile() {

    const { userProfile, setUserProfile, userPfp, setUserPfp } = useContext(UserContext);

    useEffect(() => {
        console.log(userProfile)
    }, [userProfile])

    async function setPfpImage(e) {
        try {
            
            const file = e.target.files[0];
    
            try {
                await str.pfp.check(userProfile.$id);
                await str.pfp.delete(userProfile.$id);
            } catch (error) {
                console.log("Deleting users existing pfp:", error);
            }

            await str.pfp.create(userProfile.$id, file);

            const reader = new FileReader();
            
            reader.onload = () => {
                const imageUrl = reader.result;
    
                setUserPfp(imageUrl);
            };

            reader.readAsDataURL(file);
            console.log(reader);

        } catch (error) {

            console.log("Pfp error:", error);           

        }
    }

    const [logoutAlert, setLogoutAlert] = useState(false);
    const [featureAlert, setFeatureAlert] = useState(false);

    async function updateAccent(newAccent) {
        
        try {
            
            const updatedPrefs = {
                ...userProfile.prefs, 
                accent: newAccent
            }

            await user.prefs(updatedPrefs)

            const profile = {
                ...userProfile,
                prefs: updatedPrefs
            }

            setUserProfile(profile);

        } catch (error) {

            console.log("Updating theme:", error);
        
        }

    }

    async function updateQuirk() {
        
        try {
            
            const updatedPrefs = {
                ...userProfile.prefs, 
                quirk: !userProfile.prefs.quirk
            }

            await user.prefs(updatedPrefs)

            const profile = {
                ...userProfile,
                prefs: updatedPrefs
            }

            setUserProfile(profile);

        } catch (error) {

            console.log("Updating theme:", error);
        
        }

    }

    async function updateQuote() {
        
        try {
            
            const updatedPrefs = {
                ...userProfile.prefs, 
                quote: !userProfile.prefs.quote
            }

            await user.prefs(updatedPrefs)

            const profile = {
                ...userProfile,
                prefs: updatedPrefs
            }

            setUserProfile(profile);

        } catch (error) {

            console.log("Updating theme:", error);
        
        }

    }

    async function updateStreak() {
        
        try {
            
            const updatedPrefs = {
                ...userProfile.prefs, 
                streak: !userProfile.prefs.streak
            }

            await user.prefs(updatedPrefs)

            const profile = {
                ...userProfile,
                prefs: updatedPrefs
            }

            setUserProfile(profile);

        } catch (error) {

            console.log("Updating theme:", error);
        
        }

    }

    async function logout() {
        try {
            await user.logout();
            setUserProfile(null);
            setUserPfp(null)
        } catch (error) {
            console.log("Logout error:", error);
        }
    }

    return (  
        <div className="profile">
            
            <section className="user-display">

                <label className="pfp-cont">
                    {userPfp ? 
                        <img src={userPfp} alt="your pfp" className="pfp"/> 
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


                        <div className={`${userProfile?.prefs.accent === 'blue' ? 'border-[var(--accent)]' : ''}`}
                        onClick={() => updateAccent('blue')}>
                            <span className="blue"></span>
                        </div>


                        <div className={`${userProfile?.prefs.accent === 'purple' ? 'border-[var(--accent)]' : ''}`}
                        onClick={() => updateAccent('purple')}>
                            <span className="purple"></span>
                        </div>
                        

                        <div className={`${userProfile?.prefs.accent === 'pink' ? 'border-[var(--accent)]' : ''}`}
                        onClick={() => updateAccent('pink')}>
                            <span className="pink"></span>
                        </div>


                        <div className={`${userProfile?.prefs.accent === 'green' ? 'border-[var(--accent)]' : ''}`}
                        onClick={() => updateAccent('green')}>
                            <span className="green"></span>
                        </div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Optima quirk</p>
                    <div className={`pref-toggle ${userProfile?.prefs.quirk ? 'bg-[var(--accent)]' : ''}`} 
                    onClick={() => updateQuirk()}>
                        <div className={`pref-toggle-switch ${userProfile?.prefs.quirk ? 'translate-x-24':''}`}></div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Daily quote</p>
                    <div className={`pref-toggle pref-toggle-quote ${userProfile?.prefs.quote ? 'bg-[var(--accent)]' : ''}`} 
                    onClick={() => setFeatureAlert(true)}>
                        <div className={`pref-toggle-switch ${userProfile?.prefs.quote ? 'translate-x-24':''}`}></div>
                    </div>
                </div>
                
                <div className="user-pref">
                    <p>Streak</p>
                    <div className={`pref-toggle ${userProfile?.prefs.streak ? 'bg-[var(--accent)]' : ''}`} 
                    onClick={() => updateStreak()}>
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
                    <button className="delete-account" onClick={() => setFeatureAlert(true)}>
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

            {
                featureAlert && <Alert
                    text={"Feature coming soon!"}
                    buttonActionOne={() => setFeatureAlert(false)}
                />
            }
        
        </div>
    );
}

export default Profile;