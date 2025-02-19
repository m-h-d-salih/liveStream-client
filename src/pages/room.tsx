import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { RoomContext } from '../context/roomContext';
import VideoPlayer from '../components/videoPlayer';

const Room = () => {
    const {id}=useParams();
    const {ws,me,stream}=useContext(RoomContext);
   
    useEffect(()=>{
       if(me) ws.emit('join-room',{roomId:id,peerId:me._id});
    },[id,me,ws])
  return (
    <div>
      Room id {id}
      <div className=''>
        <VideoPlayer stream={stream} />
      </div>
    </div>
  )
}

export default Room
