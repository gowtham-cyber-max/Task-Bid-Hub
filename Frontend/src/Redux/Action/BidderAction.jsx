
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
export const bidderSignup=(data)=>async(dispatch,getState)=>{
        try{
            const res=await serv.bidder_signup(data);
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }

}
export const taskList_Bidders=()=>async(dispatch,getState)=>{
    try {
        // Extract bidder skills and location from the state
        const skills = getState().bidder.bidder?.skills;
        const coordinates = getState().bidder.bidder.location.coordinates;
        const longitude = coordinates[0];
        const latitude = coordinates[1];
    
    
        // Prepare the data to be sent
        const data = {
            skills,
            latitude,
            longitude,
        };
    
        const res = await serv.getTaskList_bidder(data);

        dispatch({ type: "EMPTY_TASK_BIDDERS" });
        dispatch({ type: "GET_TASK_BIDDER", payload:(res.data) });
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
    }
}
export const addBidLog=(data)=>async(dispatch,getState)=>{
    try{
        
        const  bidderId= getState().bidder.bidder?._id;
        const preparedData={
            bidderId,
            ...data
        }
        const res=await serv.bidder_addBidLog(preparedData);
        console.log(res.data);
    }
    catch(er){
        console.log(er);
    }
}


export const addViewToTask=(taskId)=>async(dispatch,getState)=>{
    try{
        const res=await serv.bidder_addViewToTask(taskId);
        console.log(res.data);
    }
    catch(er){
        console.log(er);
    }
    
}

export const getBidListForBidders=(bidderId)=>async(dispatch,getState)=>{
    try{
        const res=await serv.bidder_getBidListForBidders(bidderId);
        dispatch({type:"EMPTY_BIDDER_BIDS"});
        dispatch({type:"ADD_BIDDER_BIDS",payload:res.data});
        console.log(res.data);
    }
    catch(er){
        console.log(er);
    }
}
export const getBidsForQueue=(bidLogIds)=>async(dispatch,getState)=>{
    try{
        const res = await serv.bidder_getBidsForQueue(bidLogIds);
        dispatch({type:"EMPTY_BIDDER_BIDS"});
        dispatch({type:"ADD_BIDDER_BIDS",payload:res.data});
    }
    catch(er){
        console.log(er);
    }
}
export const otpValidationStartTheWorkRemoveFromQueue=(data)=>async(dispatch,getState)=>{
    try{
        const res = await serv.bidder_otpValidationStartTheWorkRemoveFromQueue(data);
        console.log(res.data);
        if(res.data?.message==="success"){
            return true;
        }
        else{
            return false;
        }
    }
    catch(er){
        console.log(er);
    }
}

