import React, { useContext } from 'react'
import { Join } from '../components/createButton'
import { RoomContext } from '../context/roomContext'

const Home = () => {
    const {ws}=useContext(RoomContext)
    const hand=()=>{
        ws.emit('hii')
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
