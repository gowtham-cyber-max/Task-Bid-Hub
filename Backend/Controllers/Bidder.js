const BidderModel=require("../Models/Bidder")






//  Task posting 
async function addBidder (req, res) {
    const Bidder = new BidderModel(req.body);
    try {
        const r=await Bidder.save();
        res.json(Bidder); 

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading task" });
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

module.exports={addBidder,addLogToBidder,getAllBidder};