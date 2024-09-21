const BidderModel=require("../Models/Bidder")






//  Task posting 
async function addBidder (req, res) {
    const Bidder = new BidderModel(req.body);
    try {
        await Bidder.save();
        res.json(Bidder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading task" });
    }
};


module.exports={addBidder};