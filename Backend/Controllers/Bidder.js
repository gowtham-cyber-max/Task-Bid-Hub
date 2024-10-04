const BidderModel=require("../Models/Bidder")

const {setTheRequest}=require("./Task")





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
async function addLogToBidder(req,res){
    const Bidder=await BidderModel.findById(req.body.bidderId);
    console.log(Bidder);
    Bidder.TaskBidded.push(req.body.taskId);

    await Bidder.save();

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
async function addTaskToQueue(req,res){
    const {bidderId,taskId}=req.body;
    try{
        const bidder=await BidderModel.findById(bidderId);
        bidder.taskQueue.push(taskId);
        await bidder.save();
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
        setTheRequest(req,res);
        const bidder=await BidderModel.findById(bidderId);
        bidder.completeRequest.push(taskId);
        await bidder.save();
    }
    catch(er){
        console.error(er);
        res.status(500).json({ message: "Error sending request" });
    }
}

// add task into completed task list in bidder model
async function addTaskToCompleted(req,res){
    const {bidderId,taskId}=req.body;
    try{
        const bidder=await BidderModel.findById(bidderId);
        bidder.TaskCompleted.push(taskId);
        await bidder.save();
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




module.exports={addBidder,addLogToBidder,getAllBidder,addTaskToQueue,sendCompletedRequest,addTaskToCompleted,bidderLogin};