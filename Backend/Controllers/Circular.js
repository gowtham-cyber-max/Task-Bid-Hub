const {addLogToTask,TaskMarkAsCompleted, TaskAccepted,setTheRequest}=require("./Task")
const {addLogToBidder,addTaskToCompleted,addTaskToBidderQueue,sendCompletedRequest}=require("./Bidder")
const {addLog,bidderAccepted}=require("./BidLogController")

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
        // const bidlog=
        if(bidder && task){
            console.log(bidder)
            console.log(task)
            res.json("sucess");
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
            if(task && bidder){
                res.json("sucess")
            }
            else{
                res.json("fail")
            }
    }
    catch(er){
        console.log(er);
    }
}
module.exports={addBidLog,markAsCompleted,Accepted,CompleteRequestToUser};