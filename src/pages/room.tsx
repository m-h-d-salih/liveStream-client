import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { RoomContext } from '../context/roomContext';
import VideoPlayer from '../components/videoPlayer';
import { PeerState } from '../context/peerReducer';

const Room = () => {
    const {id}=useParams();
    const {ws,me,stream,peers}=useContext(RoomContext);
   
    useEffect(()=>{
       if(me) ws.emit('join-room',{roomId:id,peerId:me._id});
    },[id,me,ws])
  return (
    <div>
      Room id {id}
      <div className='grid grid-cols-4 gap-4'>
        <VideoPlayer stream={stream} />
        {Object.values(peers as PeerState).map(peer=>(
             <VideoPlayer key={stream} stream={stream} />
        ))}
      </div>
    </div>
  )
}

export default Room
