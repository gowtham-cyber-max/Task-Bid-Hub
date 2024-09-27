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
async function addLogToBidder(req,res){
    const Bidder=await BidderModel.findById(req.body.BidderId);
    console.log(Bidder);
    Bidder.TaskBidded.push(req.body.TaskId);

    await Bidder.save();

}
async function getAllBidder(req,res){
    try{
        const Bidder=await BidderModel.find();
        res.json(Bidder);
        }catch(err){
            console.error(err);
            res.status(500).json({ message: "Error fetching task" });
            }
    
}

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

module.exports={addBidder,addLogToBidder,getAllBidder,addTaskToQueue,sendCompletedRequest};