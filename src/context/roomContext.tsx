import Peer from 'peerjs';
import { createContext, ReactNode, useEffect, useState, useReducer } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidV4 } from 'uuid';
import socketIOClient from 'socket.io-client';
import { peerReducer } from './peerReducer';
import { addPeerAction, removePeerAction } from './peerActions';

export const RoomContext = createContext<any>(null);
const WS = 'http://localhost:8080';
const ws = socketIOClient(WS);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, dispatch] = useReducer(peerReducer, {});

  // Enter Room Handler
  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log('Entering Room:', roomId);
    navigate(`/room/${roomId}`);
  };

  // Get Users List
  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log('Participants:', participants);
  };

  // Remove Peer when disconnected
  const removePeer = (peerId: string) => {
    console.log('Removing Peer:', peerId);
    dispatch(removePeerAction(peerId));
  };

  useEffect(() => {
    const meId = uuidV4();
    console.log("Generated Peer ID:", meId);
    
    const peer = new Peer(meId);
    
    peer.on('open', (id) => {
      console.log("Peer Connected with ID:", id);
      setMe(peer);
    });
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      console.log("✅ User Media Stream Acquired", stream);
      setStream(stream);
    })
    .catch((error) => {
      console.error("❌ Media Error:", error);
      console.error("Error Name:", error.name);
      console.error("Error Message:", error.message);
    });
  

    ws.on('room-created', enterRoom);
    ws.on('get-users', getUsers);
    ws.on('user-disconnected', removePeer);

    return () => {
      console.log("Cleaning up Peer and Socket connections...");
    
      if (peer && !peer.destroyed) {
        peer.destroy();
      }
      ws.off('room-created', enterRoom);
      ws.off('get-users', getUsers);
      ws.off('user-disconnected', removePeer);
    };
  }, []);

  useEffect(() => {
    if (!me || !stream) return;
    
    console.log("Setting up Peer Connections...");
    
    ws.on('user-joined', ({ peerId }) => {
      if (!peerId) return;
      
      console.log("New User Joined:", peerId);
      const call = me.call(peerId, stream);
      
      call.on('stream', (peerStream) => {
        console.log("Receiving Peer Stream:", peerId);
        dispatch(addPeerAction(peerId, peerStream));
      });

      call.on('close', () => {
        console.log("Call Closed, Removing Peer:", peerId);
        dispatch(removePeerAction(peerId));
      });
    });

    me.on('call', (call) => {
      console.log("Answering Call from:", call.peer);
      call.answer(stream);

      call.on('stream', (peerStream) => {
        console.log("Receiving Peer Stream from Answered Call:", call.peer);
        dispatch(addPeerAction(call.peer, peerStream));
      });

      call.on('close', () => {
        console.log("Call Closed, Removing Peer:", call.peer);
        dispatch(removePeerAction(call.peer));
      });
    });

    // return () => {
    //   console.log("Cleaning up user-joined and call listeners...");
    //   ws.off('user-joined');
    //   me.off('call');
    // };
  }, [me, stream]);

  console.log("Current Peers:", peers);

  return (
    <RoomContext.Provider value={{ ws, me, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};
