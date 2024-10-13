const BidLog=require("../Models/BidLog")

async function AddLog(req,res){
    try{
        const bidlog=new BidLog(req.body);
        await bidlog.save()
        console.log(bidlog);
        return bidlog;
    } 
    catch(er){
        res.status(500).json({message:er.message})
    }   
}

async function getAllBidsForTask(req,res){
    try{
        const taskId=req.query.taskId;
        console.log(taskId);
        const bids=await BidLog.find({TaskId:taskId});
        res.json(bids);
    }
    catch(er){
        res.status(500).json({message:er.message})
    }
}
async function getAllBidsForBidder(req,res){
    try{
        const bidderId=req.query.BidderId;
        console.log(bidderId);
        const bids=await BidLog.find({BidderId:bidderId});
        res.json(bids);
    }
    catch(er){
        res.status(500).json({message:er.message})
    }
}

module.exports={AddLog,getAllBidsForTask,getAllBidsForBidder};