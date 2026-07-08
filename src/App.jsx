import { useState } from 'react';
import AppLayout from './AppLayout.jsx';
import Welcome from './Welcome.jsx'
import WelcomeBack from './WelcomeBack.jsx'
import { Route, Routes, Navigate } from "react-router-dom";

function App() {

  const [user, setIsUser] = useState(true);

  return (
    
    <Routes>

      <Route path="/" element={user ? <Navigate to="/test" replace/> : <Welcome/>}></Route>
      <Route path="/signin" element={user ? <Navigate to="/test" replace/> : <WelcomeBack/>}></Route>

      <Route path='/test' element={!user ? <Navigate to="/" replace/> : <AppLayout/>}></Route>

    </Routes>
  )
}

export default App