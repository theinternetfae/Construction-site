import { useState } from 'react'
import Welcome from './Welcome.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Welcome />
    </main>
  )
}

export default App