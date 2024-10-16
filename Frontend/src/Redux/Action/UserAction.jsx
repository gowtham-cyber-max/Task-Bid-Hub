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
export const addTask = (data) => async (dispatch, getState) => {
    try {
        const { latitude, longitude } = data;
        const userId=getState().user.user._id;
               
        const taskData = {
            ...data,
            userId

        };
        if(userId){
        const res = await serv.user_addTask(taskData);
        console.log(res.data);}


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
            
            getBidForTask(bid.taskId);
            
        }
        catch(er){
            console.log(er);
            
        }
}


