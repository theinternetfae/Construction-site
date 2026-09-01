import { useEffect, useLayoutEffect, useState, useMemo } from 'react';
import AppLayout from './AppLayout.jsx';
import Welcome from './Welcome.jsx';
import WelcomeBack from './WelcomeBack.jsx';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home.jsx';
import Stats from './pages/Stats.jsx';
import Settings from './pages/Settings.jsx';
import { TaskContext, UserContext } from './js files/contexts.js';
import Profile from './settings pages/Profile.jsx';
import History from './settings pages/History.jsx';
import Privacy from './settings pages/Privacy.jsx';
import About from './settings pages/About.jsx';
import Verify from './utilities jsx/Verifying.jsx';
import user from './appwrite files/accounts.js';
import Loader from './utilities jsx/Loader.jsx';
import str from './appwrite files/storage.js';
import db from './appwrite files/databases.js';
import { Query } from "appwrite";

function App() {

  const [userProfile, setUserProfile] = useState(null);
  const [userPfp, setUserPfp] = useState(null);
  const [taskList, setTaskList] = useState([])

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    async function getUser() {
      
      try {
      
        //USERPROFILE
        setLoading(true);
        const theUser = await user.get();
        setUserProfile(theUser)


        //USERPFP
        try {
          
          await str.pfp.check(theUser.$id);
        
          const pfpUrl = await str.pfp.getUrl(theUser.$id);
          setUserPfp(pfpUrl);
        
        } catch (error) {

          console.log("PFP loading error:", error);
          setUserPfp(null)  
        
        }
      
        //TASKLIST
        try {
    
          const tasks = await db.tasks.list([
            Query.equal("userId", theUser.$id),
            Query.orderAsc("$createdAt"),
            Query.limit(500)
          ]);
          
          setTaskList(tasks.documents);
 
        } catch (err) {

          setTaskList([]);
                  
          console.log("Loading tasks list:", err);

        }

      } catch(err) {

        console.log(err);
        setUserProfile(null);
      
      } finally {
      
        setLoading(false);
      
      }
    
    }

    getUser();
  }, [])

  const root = document.documentElement;

  useLayoutEffect(() => {
    
    root.classList.remove(
      'accent-purple',
      'accent-pink',
      'accent-green'
    );

    if (userProfile?.prefs.accent === 'purple') root.classList.add('accent-purple');
    if (userProfile?.prefs.accent === 'pink') root.classList.add('accent-pink');
    if (userProfile?.prefs.accent === 'green') root.classList.add('accent-green');
    
  }, [userProfile])

  useLayoutEffect(() => {

    root.classList.toggle('dark', userProfile?.prefs.themeDark)

  }, [userProfile])


  const [level, setLevel] = useState(0);

  const generalCirlceProgress = useMemo(() => {

    let counter = 100;

    const completed = taskList.filter(t => t.completed).length;

    const progress = taskList.length === 0 ? 0 : completed / taskList.length * 100;
    
    counter = counter - progress;

    progress <= 49 ? setLevel(1) : progress <= 79 ? setLevel(2) : progress >= 80 ? setLevel(3) : '';

    return {
      counter,
      progress: progress.toFixed(2)
    };
  

  }, [taskList])


  if(loading) {
    return <Loader/>;
  }

  return (
    
    <TaskContext.Provider value={{taskList, setTaskList, level, setLevel, generalCirlceProgress}}>

      <UserContext.Provider value={{userProfile, setUserProfile, userPfp, setUserPfp}}>

        <Routes>

          <Route path='/verify' element={<Verify/>}></Route>
          
          <Route path="/" element={userProfile?.emailVerification ? <Navigate to="/interior" replace/> : <Welcome/>}></Route>
          <Route path="/signin" element={userProfile?.emailVerification ? <Navigate to="/interior" replace/> : <WelcomeBack/>}></Route>

          <Route path="/interior" element={!userProfile?.emailVerification ? <Navigate to="/" replace/> : <AppLayout/>}>

            <Route index element={<Navigate to="home" replace />}></Route>

            <Route path="home" index element={<Home/>}></Route>
            <Route path="stats" element={<Stats/>}></Route>
            
            <Route path="settings" element={<Settings/>}>
              
              <Route index element={<Navigate to="profile" replace />}></Route>

              <Route path="profile" element={<Profile/>}></Route>
              <Route path="history" element={<History/>}></Route>
              <Route path="privacy" element={<Privacy/>}></Route>              
              <Route path="about" element={<About/>}></Route>
            
            </Route>

          </Route>

        </Routes>

      </UserContext.Provider>

    </TaskContext.Provider>
  
  )
}

export default App;