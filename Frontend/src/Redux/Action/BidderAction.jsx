import Serv from "../Service/Service"
const serv=Serv;

export const bidderLogin=(data)=>async(dispatch,getState)=>{
        try{
            console.log(data);
            const res=await serv.bidder_login(data);
        dispatch({type:"BIDDER_LOGIN",payload:res.data});
        }
        catch(err){
            console.log(err);
        }

}