
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
            if(res.data){
                return true;
            }
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
        return true;
    }
    catch(er){
        console.log(er);
    }
}
export const getBidsForQueue=()=>async(dispatch,getState)=>{
    try{
        const refresh=await dispatch(refreshTheBidder());
        
        if(refresh){
            const bidLogIds=getState().bidder.bidder?.taskQueue;
            if(bidLogIds.length>=0){
                const res = await serv.bidder_getBidsForQueue(bidLogIds);
                dispatch({type:"EMPTY_BIDDER_BIDS"});
                dispatch({type:"ADD_BIDDER_BIDS",payload:res.data});
                
                if(res.data){
                    return true;
                }
            }
        }   
    }
    catch(er){
        console.log(er);
    }
}
export const otpValidationStartTheWorkRemoveFromQueue=(data)=>async(dispatch,getState)=>{
    try{
        
        const hell=await dispatch(getBidsForQueue());
        if(hell){
           const res = await serv.bidder_otpValidationStartTheWorkRemoveFromQueue(data);
            console.log(res.data);
            if(res.data?.message==="success"){
            
                 return true;
            }
            else{
                return false;
            }
        }
    }
    catch(er){
        console.log(er);
    }
}
export const getCompletedTaskList=(bidderId)=>async(dispatch,getState)=>{
    try{
        const res = await serv.common_completedTaskList(bidderId);
        console.log(res.data);
        dispatch({ type: "EMPTY_TASK_BIDDERS" });
        dispatch({ type: "GET_TASK_BIDDER", payload:(res.data) });
    }
    catch(er){
        console.log(er);
    }

}
export const getBidsInProgress=(bidderId)=>async(dispatch,getState)=>{
    try{
        const res = await serv.bidder_getBidsInProgress(bidderId);
        console.log(res.data);
        dispatch({type:"EMPTY_BIDDER_BIDS"});
        dispatch({type:"ADD_BIDDER_BIDS",payload:res.data});
    }
    catch(er){
        console.log(er);
    }

}
export const sendCompleteRequest=(data)=>async(dispatch,getState)=>{

    try{
        const hell=await dispatch(getBidsForQueue());
        const res = await serv.bidder_sendCompleteRequest(data);
        console.log(res.data);
        if(res.data==="success" && hell){
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

export const refreshTheBidder=()=>async(dispatch,getState)=>{
    const  bidderId= getState().bidder.bidder?._id;
    try{
        const res = await serv.bidder_getById(bidderId);
        if(res){
        dispatch({type:"BIDDER_LOGIN",payload:res.data});
        return true;
         }
         else{
            return false;
         }
    }
    catch(Er){
        console.log(Er);
    }
}