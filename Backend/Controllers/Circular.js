const {addLogToTask,TaskMarkAsCompleted, TaskAccepted,}=require("./Task")
const {addLogToBidder,addTaskToCompleted,addTaskToBidderQueue}=require("./Bidder")
const {AddLog}=require("./BidLogController")

async function addBidLog(req,res){
    try{
        console.log(req.body)
    const BidLog=await AddLog(req,res);
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
        if(bidder && task){
            res.json("sucess");
            }
    }
    catch(er){
        console.log(er);
    }

}
module.exports={addBidLog,markAsCompleted,Accepted};