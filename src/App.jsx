import { useEffect, useLayoutEffect, useState } from 'react';
import AppLayout from './AppLayout.jsx';
import Welcome from './Welcome.jsx';
import WelcomeBack from './WelcomeBack.jsx';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home.jsx';
import Stats from './pages/Stats.jsx';
import Settings from './pages/Settings.jsx';
import { TaskContext, UserContext } from './js files/contexts.js';
import { getTaskList } from './js files/Storage.js';
import Profile from './settings pages/Profile.jsx';
import History from './settings pages/History.jsx';
import Privacy from './settings pages/Privacy.jsx';
import About from './settings pages/About.jsx';
import user from './appwrite files/accounts.js';
import Loading from './utilities jsx/Loading.jsx';

function App() {

  const [verified, isVerified] = useState(false);

  const [userProfile, setUserProfile] = useState(null);
  
  async function getUser() {

    try {
      
      const theUser = await user.get();

      console.log("Logged in user:", theUser);

      // if(!theUser.emailVerification) {
      //   await user.
      // }

      setUserProfile(theUser);
      
    } catch (error) {
      
      console.log("Getting user error:", error)
    
      setUserProfile(null);

    }

  }
  
  useEffect(() => {  

    getUser();
    
  }, [])


  const [taskList, setTaskList] = useState(
    getTaskList() || []
  )

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

  return (
    
    <TaskContext.Provider value={{taskList, setTaskList}}>

      <UserContext.Provider value={{userProfile, setUserProfile, getUser}}>

        {/* <Loading/> */}

        <Routes>

          <Route path="/" element={userProfile ? <Navigate to="/interior" replace/> : <Welcome/>}></Route>
          <Route path="/signin" element={userProfile ? <Navigate to="/interior" replace/> : <WelcomeBack/>}></Route>

          <Route path="/interior" element={!userProfile ? <Navigate to="/" replace/> : <AppLayout/>}>

            <Route index element={<Navigate to="home" replace />}></Route>

            <Route path="home" element={<Home/>}></Route>
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