import Welcome from './Welcome.jsx'
import WelcomeBack from './WelcomeBack.jsx'
import { Route, Routes } from "react-router-dom";

function App() {

  return (

    
    <Routes>

      <Route path="/" element={<Welcome/>}></Route>
      <Route path="/signin" element={<WelcomeBack/>}></Route>

    </Routes>

    // <main>
    //   <WelcomeBack />
    // </main>
  )
}

export default App