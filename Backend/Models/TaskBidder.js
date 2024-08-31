const mongoose=require("mongoose")

const TaskBidderSchema=new mongoose.Schema(
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
const TaskBidderModel=mongoose.model("TaskBidder",TaskBidderSchema);
module.exports=TaskBidderModel;