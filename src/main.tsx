import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './index.css'
import { RoomProvider } from './context/roomContext.tsx'
import Home from './pages/home.tsx'
import Room from './pages/room.tsx'
import { ToastContainer } from 'react-toastify'
import LoginAdmin from './components/auth/loginAdmin.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

    <RoomProvider>
 <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/loginAdmin' element={<LoginAdmin/>}/>
      <Route path='/room/:id' element={<Room/>}/>
    </Routes>
    </RoomProvider>
    </BrowserRouter>
  </StrictMode>,
)
