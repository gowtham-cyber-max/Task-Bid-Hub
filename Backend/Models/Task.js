const mongoose=require("mongoose")

const TaskSchema=new mongoose.Schema({
    taskName:String,
    taskDescription:String,
    location:{
        latitude:Number,
        longitude:Number
    },
    currentDate:Date,
    endDate:Date,
    budget:Number,
    TaskBidderList:[{
        TaskBidderId:String,
        bidAmount:Number,
        bidDescription:String
    }]
})
const TaskModel=mongoose.model('Task',TaskSchema)
module.exports=TaskModel;