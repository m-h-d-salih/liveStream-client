import { useEffect, useState } from 'react'
import socketIO from 'socket.io-client';
import './App.css'
import { Join } from './components/createButton';

const ws='http://localhost:8080'

function App() {
  const [count, setCount] = useState(0)
  
  useEffect(()=>{
    socketIO(ws) 
  },[])

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
     <Join/>
     <button>clicll</button>
    </div>
  )
}

export default App
