const BidLog=require("../Models/BidLog")

async function addLog(req,res){
    try{
        console.log(req.body);
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
        const bids=await BidLog.find({taskId:taskId});
        res.json(bids);
    }
    catch(er){
        res.status(500).json({message:er.message})
    }
}
async function getAllBidsForBidder(req,res){
    try{
        const bidderId=req.query.bidderId;
        console.log(bidderId);
        const bids=await BidLog.find({bidderId:bidderId});
        res.json(bids);
    }
    catch(er){
        res.status(500).json({message:er.message})
    }
}
async function bidderAccepted(req,res){
    try{
        const {bidLogId}=req.body;
        const bidlog=await BidLog.findById(bidLogId);
        if(bidlog){
            bidlog.accepted=true;
            await bidlog.save();
            return bidlog;
        }
        return null;
    }
    catch(er){
        res.status(500).json({message:er.message})
    }
}
async function getBidLogByIds(req,res){
    try{
        const {bidLogIds}=req.query;

        if(bidLogIds.length===0){
            res.json([]);
        }
        const bidlogs=await BidLog.find({ _id : { $in : bidLogIds } });
        
        console.log(bidLogIds)
        
        res.json(bidlogs);
        
        

    }
    catch(er){
        res.status(500).json({message:er.message})
    }
}
async function startTheWork(req,res){
    const {bidLogId}=req.body;
    try{
        const bidlog=await BidLog.findById(bidLogId);
        if(bidlog){
            bidlog.start=Date.now();
            await bidlog.save();
            return bidlog;
        }
        else{
            res.status(404).json({message:"BidLog not found"})
        }
    }
    catch(er){
        res.status(500).json({message:er.message});
    }

}
module.exports={addLog,getAllBidsForTask,getAllBidsForBidder,bidderAccepted,getBidLogByIds,startTheWork};