import { useContext, useState } from "react";
import Alert from "../utilities jsx/Alert";
import { TaskContext, UserContext } from "../js files/contexts";
import user from "../appwrite files/accounts";
import str from "../appwrite files/storage";
import db from "../appwrite files/databases";
import { Query } from "appwrite";

function Privacy() {

    const {setTaskList} = useContext(TaskContext);
    const {userProfile, setUserProfile, setUserPfp} = useContext(UserContext);

    const [infoOne, setInfoOne] = useState(false);
    const [infoTwo, setInfoTwo] = useState(false);

    const [alertOne, setAlertOne] = useState(false);
    const [alertTwo, setAlertTwo] = useState(false);
    const [taskHistoryAlert, setTaskHistoryAlert] = useState(false);

    async function clearTaskHistory() {
        
        try {

            const tasks = await db.tasks.list([
                Query.equal("userId", userProfile.$id),
                Query.limit(500)
            ]);

            const allTasks = tasks.documents;

            await Promise.all(allTasks.map(dc => db.tasks.delete(dc.$id)));
        
            setTaskList([]);  
            localStorage.clear();

            setTaskHistoryAlert(true);

        } catch (error) {
            console.log(error);            
        }

    }

    async function resetUserData() {
        
        try {

            localStorage.clear();
            
            clearTaskHistory();
            
            const updatedPrefs = { 
                accent: 'blue',
                quirk: true,
                quote: false,
                streak: true,
                themeDark: true,
            }
            
            await user.prefs(updatedPrefs)
            
            const profile = {
                ...userProfile,
                prefs: updatedPrefs
            }
            
            setUserProfile(profile);
        
            try {
            
                await str.pfp.delete(userProfile.$id);
                setUserPfp(null);
                
            } catch (error) {
        
                console.log("PFP deleting error:", error);  
        
            }
        

        } catch (error) {

            console.log("Resetting user Data:", error);
        
        }

    }

    return ( 
        <div className="privacy">

            <section className="more-info">
        
                <div className="info">
                    <div className="opener"
                        onClick={() => {
                            setInfoOne(prev => !prev)
                        }}
                    >
                        <i className={infoOne ? 'bi bi-caret-down' : 'bi bi-caret-right'}></i>
                        What data is stored?
                    </div>
                    <p className={infoOne ? '' : 'hidden'}>Data stored include: Tasks and schedules, completion history, app preferences, and profile info.</p>
                </div>
        
                <div className="info">
                    <div className="opener"
                        onClick={() => {
                            setInfoTwo(prev => !prev)
                        }}
                    >
                        <i className={infoTwo ? 'bi bi-caret-down' : 'bi bi-caret-right'}></i>
                        How is it stored?
                    </div>
                    <p className={infoTwo ? '' : 'hidden'}>Your data is stored in our appWrite database where only the creator of the app, Favour Egwele, has access.</p>
                </div>

            </section>

            <section className="separator">
                <div className="demacator"></div>
                    <p>Controls</p>
                <div className="demacator"></div>
            </section>

            <section className="task-handler">

                <div className="control">
                    <div className="control-label">
                        <p>Clear task history</p>
                        <p className="subtitle">Delete all tasks</p>
                    </div>
                    <button
                        onClick={() => setAlertOne(true)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>

                <div className="control">
                    <div className="control-label">
                        <p>Reset all data</p>
                        <p className="subtitle">Delete all data and preferences</p>
                    </div>
                    <button
                        onClick={() => setAlertTwo(true)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>

            </section>

            <button className="download">
                <i className="bi bi-download"></i>
                Download your data
            </button>

            {alertOne && <Alert
                text={'Agreeing to this will delete every task in your storage, giving you a clean slate. Are you sure?'}
                buttonTextOne={'Cancel'}
                buttonActionOne={() => setAlertOne(false)}
                buttonTextTwo={'Delete'}
                buttonActionTwo={() => {
                    clearTaskHistory();
                    setAlertOne(false)
                }}
                unique={true}
            />}

            {alertTwo && <Alert
                text={'Agreeing to this will delete all your data; tasks, preferences etc. Are you sure?'}
                buttonTextOne={'Cancel'}
                buttonActionOne={() => setAlertTwo(false)}
                buttonTextTwo={'Delete'}
                buttonActionTwo={() => {
                    resetUserData();
                    setAlertTwo(false)
                }}
                unique={true}
            />}

            {taskHistoryAlert && <Alert
                text={'Your data has been cleared successfully!'}
                buttonActionOne={() => {
                    setTaskHistoryAlert(false)
                }}
            />}
        
        </div>
    );
}

export default Privacy;