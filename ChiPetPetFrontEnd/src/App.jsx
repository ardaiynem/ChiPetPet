import { useState } from 'react'
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainPage />
    </>
  )
}

export default App;
