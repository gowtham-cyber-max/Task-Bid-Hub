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
        pass:String,
        noOfCompletion:Number,
        skills:[String],
        TaskCompleted:{
            type:[mongoose.Types.ObjectId],
            ref:"Task",
            default:[]
        },
        TaskBidded:{
            type:[mongoose.Types.ObjectId],
            ref:"Task",
            default:[]
        },// if i want to know the details of task bidded details, i will filter the task who is biidedid is equal to this biddedid
        
    }
)
const BidderModel=mongoose.model("Bidder",BidderSchema);
module.exports=BidderModel;