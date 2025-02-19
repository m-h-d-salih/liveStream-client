import { ADD_PEER, REMOVE_PEER } from "./peerActions"

export type PeerState=Record<string,{stream:MediaStream}>
type PeerAction={
    type:typeof ADD_PEER;
    payload:{
        peerId:string;stream:MediaStream
    }
} | {
    type:typeof REMOVE_PEER;
    payload:{
        peerId:string;
    }
}
export const peerReducer=(state:PeerState,action:PeerAction)=>{
    switch(action.type){
        case ADD_PEER:
            // console.log(state)
            const data={
                ...state,
                [action.payload.peerId]:{
                    stream:action.payload.stream,
                }
            }
            console.log(data)
            return{
                ...state,
                [action.payload.peerId]:{
                    stream:action.payload.stream,
                }
            }
        case REMOVE_PEER:
            const {[action.payload.peerId]:deletd,...rest}=state;
            return rest;
        default :return {...state};
    }
}