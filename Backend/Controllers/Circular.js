const {addLogToTask,TaskMarkAsCompleted, TaskAccepted,setTheRequest,otpValidation}=require("./Task")
const {addLogToBidder,addTaskToCompleted,addTaskToBidderQueue,sendCompletedRequest,removeTaskFromQueue}=require("./Bidder")
const {addLog,bidderAccepted,startTheWork, setEndInLog}=require("./BidLogController")

async function addBidLog(req,res){
    try{
        console.log(req.body)
    const BidLog=await addLog(req,res);
    const task=await addLogToTask(req,res);
    const bidder=await addLogToBidder(req,res);
    if(task && bidder && BidLog){
        res.json("sucess");
    }
    }
    catch(er){
        console.log(er);
    }

}


async function markAsCompleted(req,res){
    try{
        const task=await TaskMarkAsCompleted(req,res);
        const bidder=await addTaskToCompleted(req,res);
        if(bidder && task){
            res.json("success");
        }
        else{
            console.log(bidder);
            console.log(task);
            res.json("failed");
        }
    }
    catch(er){
        console.log(er);
    }
}
async function Accepted(req,res){
    try{
        const task=await TaskAccepted(req,res);
        const bidder=await addTaskToBidderQueue(req,res);
        const bidlog=await bidderAccepted(req,res);
        
        if(bidder && task && bidlog){
           
            res.json("sucess");
        }
        else{
            res.json("failed in accepting ");
        }
    }
    catch(er){
        console.log(er);
    }

}
async function CompleteRequestToUser(req,res){
    try{
            const task=await setTheRequest(req,res);
            const bidder=await sendCompletedRequest(req,res);
            
            //remove the task from bidder queue
            const bidder2=await removeTaskFromQueue(req,res);

            const bidlog=await setEndInLog(req,res);
            if(task && bidder && bidlog && bidder2){
                res.json("success")
            }
            else{
                console.log(task);
                console.log(bidder);
                console.log(bidlog);
                res.json("fail")
            }
    }
    catch(er){
        console.log(er);
    }
}
async function otpValidateStarWork(req,res){
    const {otp,taskId,bidLogId,bidderId}=req.body;
    try{
        if(!otp || !taskId || !bidLogId || !bidderId ){
            res.status(400).json({message:"Otp or taskId or bidLogId is not found"});
            return; 
        }
        const validate=await otpValidation(req,res);
        if(!validate){
            res.status(400).json({message:"Wrong Otp"});
        }
        else{
            const bidLog=startTheWork(req,res);
            if(bidLog){
                res.status(200).json({message:"success"});
            }
            else{
                res.status(400).json({message:"problem in start the work"});
            }
        }
    }
    catch(er){

    }
}
module.exports={addBidLog,markAsCompleted,Accepted,CompleteRequestToUser,otpValidateStarWork};