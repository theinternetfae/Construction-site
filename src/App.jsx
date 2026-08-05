import { useEffect, useState } from 'react';
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
import Handler from './settings pages/Handler.jsx';


function App() {

  const [user, setIsUser] = useState(null);
  const [verified, isVerified] = useState(true);
  
  const userData = { 
    name: "",
    email: "",
    password: ""
  }

  const [taskList, setTaskList] = useState(
    getTaskList() || []
  )

  return (
    
    <TaskContext.Provider value={{taskList, setTaskList}}>

      <UserContext.Provider value={{user, setIsUser, verified, isVerified}}>

        <Routes>

          <Route path="/" element={verified ? <Navigate to="/test" replace/> : <Welcome/>}></Route>
          <Route path="/signin" element={verified ? <Navigate to="/test" replace/> : <WelcomeBack/>}></Route>

          <Route path="/test" element={!verified ? <Navigate to="/" replace/> : <AppLayout/>}>

            <Route index element={<Navigate to="home" replace />}></Route>

            <Route path="home" element={<Home/>}></Route>
            <Route path="stats" element={<Stats/>}></Route>
            
            <Route path="settings" element={<Settings/>}>
              
              <Route index element={<Navigate to="profile" replace />}></Route>

              <Route path="profile" element={<Profile/>}></Route>
              <Route path="handler" element={<Handler/>}></Route>


              {/* 
              <Route path="data"></Route>
              <Route path="about"></Route> */}
            
            </Route>

          </Route>

        </Routes>

      </UserContext.Provider>

    </TaskContext.Provider>
  
  )
}

export default App;