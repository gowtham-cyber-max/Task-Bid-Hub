import Serv from "../Service/Service";

const serv=Serv;

export const getAllMessage=(bidLogId)=>async(dispatch,getState)=>{
    try{
        const res=await serv.getAllMessage(bidLogId);
        dispatch({type:"EMPTY_USER_MESSAGE"});
        dispatch({type:"GET_USER_MESSAGE",payload:res.data});
    }
    catch(er){
        console.log(er);
    }

}
export const addMessage=(messageData)=>async(dispatch,getState)=>{
    try{
        const res=await serv.addMessage(messageData);
        console.log(res.data);
    }
    catch(er){
        console.log(er);
    }
}
export const delOneMessage=(id)=>async(dispatch,getState)=>{
    try{
        const res=await serv.delOneMessage(id);
        console.log(res.data);
    }
    catch(er){
        console.log(er);
    }
}