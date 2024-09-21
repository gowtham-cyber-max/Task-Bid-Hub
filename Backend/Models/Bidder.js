const mongoose=require("mongoose")

const BidderSchema=new mongoose.Schema(
    {
        companyName:String,
        name:String,
        email:String,
        phone:String,
        location:[String],
        proof:String,
        taskList:[String],
        stars:Number,
        passWord:String,
        noOfProjects:Number,
        skills:[String]
    }
)
const BidderModel=mongoose.model("Bidder",BidderSchema);
module.exports=BidderModel;