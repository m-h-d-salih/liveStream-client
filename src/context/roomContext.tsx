import Peer from 'peerjs';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {v4 as uuidV4} from 'uuid';
import socketIOClient from 'socket.io-client';

export const RoomContext = createContext<any>(null);
const WS = 'http://localhost:8080';
const ws=socketIOClient(WS)
export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate=useNavigate();
  const [me,setMe]=useState<Peer>()
  const [stream,setStream]=useState<MediaStream>()
  const enterRoom=({roomId}:{roomId:'string'})=>{
    console.log({roomId})
    navigate(`/room/${roomId}`)
  }
  const getUsers=({participants}:{participants:string[]})=>{
console.log({participants})
  }
  useEffect(()=>{
    const meId=uuidV4();
    const peer=new Peer(meId);
    setMe(peer)
    try {
      navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
        // console.log(stream)
        setStream(stream)
      })
    } catch (error) {
      console.log(error)
    }
    ws.on('room-created',enterRoom)
    ws.on('get-users',getUsers)
  },[])
  return (
    <RoomContext.Provider value={{ws,me,stream}}>
      {children}
    </RoomContext.Provider>
  );
};
