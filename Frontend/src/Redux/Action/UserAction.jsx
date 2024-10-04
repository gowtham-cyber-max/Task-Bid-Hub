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