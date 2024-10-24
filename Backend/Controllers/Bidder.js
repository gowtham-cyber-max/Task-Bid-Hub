const BidderModel=require("../Models/Bidder")
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;





//  Task posting 
async function addBidder (req, res) {
    try {
        // LOCATION MATTUM eduthuttu others aa ...taskData la pottu vachuruvom
        const { longitude, latitude, ...bidderData } = req.body; //separate longitude and latitude

        if (!longitude || !latitude) {
            return res.status(400).json({ message: "Longitude and latitude are required" });
        }

        const bidder = new BidderModel({
            ...bidderData,  // Spread the rest of the task data
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]  // Longitude comes first, then latitude
            }
        });

        await bidder.save();

        res.json(bidder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding bidder" });
    }
};

//add the bid in bidder Model
async function addLogToBidder(req, res) {
    try {
        const bidder = await BidderModel.findById(req.body.bidderId);
        if (bidder) {
            console.log(bidder);
            bidder.taskBidded.push(req.body.taskId);
            await bidder.save();
            return bidder; 
        } else {
            res.status(404).json({ message: "Bidder not found" });
            return null; 
        }
    } catch (er) {
        console.error(er);
        res.status(500).json({ message: "Error adding log to bidder" });
        return null; 
    }
}


// get All Bidders from model
async function getAllBidder(req,res){
    try{
        const Bidder=await BidderModel.find();
        res.json(Bidder);
        }catch(err){
            console.error(err);
            res.status(500).json({ message: "Error fetching task" });
            }
    
}

// add the tasks into bidder queue which is yet to completed
async function addTaskToBidderQueue(req,res){
    const {bidderId,bidLogId}=req.body;
    try{
        console.log(req.body);
        const bidder=await BidderModel.findById(bidderId);
        bidder.taskQueue.push(bidLogId);
        await bidder.save();
        return bidder;
    }
    catch(er){
        console.error(er);
        res.status(500).json({ message: "Error adding task to queue" });
    }
}

//send the request to the task model which is accepted by the user to complete the task
async function sendCompletedRequest(req,res){
    const {bidderId,taskId}=req.body;
    try{
        const bidder=await BidderModel.findById(bidderId);
        bidder.completeRequest.push(taskId);
        await bidder.save();
        return bidder;  
    }
    catch(er){
        console.error(er);
        res.status(500).json({ message: "Error sending request" });
    }
}

// add task into completed task list in bidder model
async function addTaskToCompleted(req,res){
    const {bidderId,taskId}=req.body;
    console.log(req.body);
    try{
        const bidder=await BidderModel.findById(bidderId);
        
        if(bidder){
            
        
        
        bidder.taskCompleted.push(taskId);
        await bidder.save();
        return bidder;
        }
        return null;
    }
    catch(er){
        console.error(er);
        res.status(500).json({message:"error on add completed task in bidder's List"})
    }
}

//bidder login by name or mail
async function bidderLogin(req,res){
    const {email,password}=req.body;
    try{
        const bidder=await BidderModel.findOne({ $or: [{ email: req.body.email }, { name: req.body.email }] });
        if(bidder){
            if(bidder.pass===password){
                res.json(bidder);
            }
            else{
                res.status(401).json({message:"Invalid password"})
                }
        
        }
        else{
            res.status(401).json({message:"Invalid email"})
        }
    }
    catch(er){
        console.error(er);
    }
}

async function  removeTaskFromQueue(req,res){
    const {bidderId,bidLogId}=req.body;
    try{
        const bidder=await BidderModel.findById(bidderId);
        if(bidder){

            console.log(bidder.taskQueue);
            console.log(bidLogId);
            bidder.taskQueue = bidder.taskQueue.filter(task => !task.equals(new ObjectId(bidLogId)));
            console.log(bidder.taskQueue);
            await bidder.save();
            return bidder;
        }
        else{
            res.status(404).json({message:"Bidder not found"})
        }

    }
    catch(er){
        console.error(er);
    }

}


module.exports={addBidder,addLogToBidder,getAllBidder,addTaskToBidderQueue,sendCompletedRequest,addTaskToCompleted,bidderLogin,removeTaskFromQueue};