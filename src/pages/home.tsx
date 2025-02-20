import React, { useContext, useEffect, useState } from 'react'
import { Join } from '../components/createButton'
import { RoomContext } from '../context/roomContext'
import LoginAdmin from '../components/auth/loginAdmin'

const Home = () => {
    const {ws}=useContext(RoomContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const hand=()=>{
        ws.emit('hii')
    }
    useEffect(() => {
      const adminId = localStorage.getItem('adminId')
      setIsAdmin(!!adminId)  // Set true if adminId exists
  }, [])
  if (!isAdmin) {
    return <LoginAdmin />
}

  return (
    <div>
        <div className='flex items-center justify-center w-screen h-screen'>
           <Join/>
           <button className='mt-96 ' onClick={hand}>clicke</button>
          </div>
    </div>
  )
}

export default Home
