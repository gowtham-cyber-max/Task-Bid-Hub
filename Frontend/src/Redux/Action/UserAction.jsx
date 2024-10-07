import Serv from "../Service/Service";

const serv=Serv;

export const userLogin=(data)=>async(dispatch,getState)=>{
    // console.log(data);
    try{
        const response=await serv.user_login(data);
        // console.log(response.data);
        dispatch({type:'USER_LOGIN',payload:response.data});
    }
    catch(error){
        console.log(error);
    }
}
export const userSinup=(data)=>async(dispatch,getState)=>{
    try{
        console.log(data);
        const res=await serv.user_signup(data);    
    }
    catch(er){
        console.log(er);
    }
}

