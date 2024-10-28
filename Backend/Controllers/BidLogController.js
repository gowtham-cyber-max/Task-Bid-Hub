const { request } = require("express");
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
async function getBidLogByIds(req, res) {
    try {
      const { bidLogIds } = req.query;
  
      // If bidLogIds is empty or not provided, return an empty array
      if (!bidLogIds || bidLogIds.length === 0) {
        return res.json([]);
      }
  
      const bidlogs = await BidLog.find({ _id: { $in: bidLogIds } });
      
      // Return the found bidlogs, or an empty array if none are found
      res.json(bidlogs.length > 0 ? bidlogs : []);
    } catch (er) {  
      res.status(500).json({ message: er.message });
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
async function getLogsInProgress(req,res) {
    const bidderId=req.query.bidderId;
    if(!bidderId){
        return res.status(400).json({message:"bidderId is required"})
    }
    try{
            const task=await BidLog.find({bidderId:bidderId,start:{$ne:null},end:{$ne:null},complete:false,request:true});
            if(task){
                res.json(task);
            }
            else{
                res.json([]);
            }
    }
    catch(er){
        console.log(er);
    }
}
async function setEndInLog(req,res){
    const {bidLogId}=req.body;
    try{
        const bidlog=await BidLog.findById(bidLogId);
        if(bidlog){
            bidlog.end=Date.now();
            bidlog.request=true;
            await bidlog.save();
            return bidlog;
        }
        return null;
    }
    catch(er){
        console.log(er);
    }
}
async function logMarkAsCompleted(req,res){
    const {bidLogId}=req.body;
    try{
        const bidlog=await BidLog.findById(bidLogId);
        if(bidLogId){
            bidLogId.complete=true;
            await bidlog.save();
            return bidlog;
        }
        else{
            return null;
        }
    }
    catch(Er){
        console.log(er);
    }
}
module.exports={addLog,getAllBidsForTask,getAllBidsForBidder,bidderAccepted,getBidLogByIds,startTheWork,getLogsInProgress,setEndInLog,logMarkAsCompleted};