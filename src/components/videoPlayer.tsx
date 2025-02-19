import React, { useEffect, useRef } from 'react'

const VideoPlayer:React.FC <{stream:MediaStream}> =({stream}) => {
    const  videoRef=useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        // console.log(stream)
        if(videoRef.current) videoRef.current.srcObject=stream;
    },[stream])
  return (
    <div>
      <video ref={videoRef} autoPlay muted/>
    </div>
  )
}

export default VideoPlayer
