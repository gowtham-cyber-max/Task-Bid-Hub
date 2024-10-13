import Serv from "../Service/Service";

const serv=Serv;

export const getAllMessage=(bidLogId)=>async(dispatch,getState)=>{
    try{
        const res=await serv.getAllMessage(bidLogId);
        dispatch({type:"EMPTY_ALL_MESSAGE"});
        dispatch({type:"GET_ALL_MESSAGE",payload:res.data});
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