import { useEffect, useState } from 'react';
import AppLayout from './AppLayout.jsx';
import Welcome from './Welcome.jsx';
import WelcomeBack from './WelcomeBack.jsx';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home.jsx';
import Stats from './pages/Stats.jsx';
import { TaskContext, UserContext } from './js files/contexts.js';
import { getTaskList } from './js files/Storage.js';


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

  useEffect(() => {
    console.log("This is the taskList", taskList);
  }, [taskList]);
  

  return (
    
    <TaskContext.Provider value={{taskList}}>

      <UserContext.Provider value={{user, setIsUser, verified, isVerified}}>

        <Routes>

          <Route path="/" element={verified ? <Navigate to="/test" replace/> : <Welcome/>}></Route>
          <Route path="/signin" element={verified ? <Navigate to="/test" replace/> : <WelcomeBack/>}></Route>

          <Route path="/test" element={!verified ? <Navigate to="/" replace/> : <AppLayout/>}>

            <Route index element={<Navigate to="home" replace />}></Route>

            <Route path="home" element={<Home/>}></Route>
            <Route path="stats" element={<Stats/>}></Route>

          </Route>

        </Routes>

      </UserContext.Provider>

    </TaskContext.Provider>
  
  )
}

export default App;