import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { RoomProvider } from './context/roomContext.tsx'
import Home from './pages/home.tsx'
import Room from './pages/room.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

    <RoomProvider>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/room/:id' element={<Room/>}/>
    </Routes>
    </RoomProvider>
    </BrowserRouter>
  </StrictMode>,
)
