import Serv from "../Service/Service";

const serv=Serv;

export const userLogin=(data)=>async(dispatch,getState)=>{
    console.log(data);
    try{
        const response=await serv.user_login(data);
        dispatch({type:'USER_LOGIN',payload:response.data.user});
        
    }
    catch(error){
        console.log(error);
    }
}
export const userSinup=(data)=>async(dispatch,getState)=>{
    try{
        // console.log(data);
        const res=await serv.user_signup(data);    
        if(res.status===200){
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
export const addTask = (data) => async (dispatch, getState) => {
    try {
        const userId=getState().user?.user?._id;
               
        const taskData = {
            ...data,
            userId

        };
        if(userId){
        const res = await serv.user_addTask(taskData);
        console.log(res.data);
        
        }
        else{
            console.log("user id not found");
        }


    } catch (error) {
        console.log("Error adding task:", error);
    }
};

export const getUserTask=(userId)=>async(dispatch,getState)=>{
    try{
        const res=await serv.user_getAllTask(userId);
        console.log(res.data);
        
        dispatch({type:'EMPTY_USER_TASK'})
        dispatch({type:'ADD_USER_TASK',payload:res.data});
    }
    catch(er){
        console.log(er);
    }
}
export const getBidForTask=(taskId)=>async(dispatch,getState)=>{
    try{
        
        const res=await serv.user_getAllBidsForTask(taskId);
        // console.log(res.data);
        
        dispatch({type:'EMPTY_USER_BIDS'})
        dispatch({type:'ADD_USER_BIDS',payload:res.data});
    }
    catch(er){
        console.log(er);
    }
}

export const acceptTheBidder=(bid)=>async(dispatch,getState)=>{
        try{
            
            const data={
                taskId:bid.taskId,
                bidderId:bid.bidderId,
                bidLogId:bid._id
            };
            const res=await serv.user_acceptTheBidder(data);
            console.log(res.data);

            // to refresh that bid 
            if(res){
            dispatch(getBidForTask(bid.taskId));
            }
        }
        catch(er){
            console.log(er);
            
        }
}
export const getOtpForTask=(taskId)=>async(dispatch,getState)=>{
    try{
        const res=await serv.user_getOtpForTask(taskId);
        console.log(res.data.otp);
        return res.data.otp;
    }
    catch(er){
        console.log(er);
    }
}


export const getCompletedTaskList=(userId)=>async(dispatch,getState)=>{
    try{
        const res = await serv.common_completedTaskList(userId);
        console.log(res.data);
        dispatch({type:'EMPTY_USER_TASK'})
        dispatch({type:'ADD_USER_TASK',payload:res.data});
    }
    catch(er){
        console.log(er);
    }

}
export const completeTheTask=(data)=>async(dispatch,getState)=>{
    try{
        console.log(data)
        const ref =await dispatch(getNotification(data.userId));
        const res = await serv.user_completeTheTask(data);
        console.log(res.data);
    }
    catch(Er){
        console.log(Er);
    }
}
export const getNotification=(userId)=>async(dispatch,getState)=>{
    try{
        const res = await serv.user_getNotification(userId);
        console.log(res.data);
        dispatch({type:'EMPTY_USER_TASK'})
        dispatch({type:'ADD_USER_TASK',payload:res.data});
    }
    catch(er){
        console.log(er);
    }
}