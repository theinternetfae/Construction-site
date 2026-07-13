import { useState } from 'react';
import AppLayout from './AppLayout.jsx';
import Welcome from './Welcome.jsx'
import WelcomeBack from './WelcomeBack.jsx'
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './main jsx/Home.jsx';
import Stats from './main jsx/Stats.jsx';

function App() {

  const [user, setIsUser] = useState(false);

  return (
    
    <Routes>

      <Route path="/" element={user ? <Navigate to="/test" replace/> : <Welcome/>}></Route>
      <Route path="/signin" element={user ? <Navigate to="/test" replace/> : <WelcomeBack/>}></Route>

      <Route path="/test" element={!user ? <Navigate to="/" replace/> : <AppLayout/>}>

        <Route index element={<Navigate to="home" replace />}></Route>

        <Route path="home" element={<Home/>}></Route>
        <Route path="stats" element={<Stats/>}></Route>

      </Route>

    </Routes>
  )
}

export default App