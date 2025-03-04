import Serv from "../Service/Service";

const serv=Serv;

export const getPreDefineSkills=()=>async(dispatch,getState)=>{
    try{
        const res=await serv.common_getPreDefineSkills();
        return res.data;
    }
    catch(er){

    }
}