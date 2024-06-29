const mongoose=require("mongoose")

const BidListSchema=new mongoose.Schema({
    taskName:String,
    taskDescription:String,
    location:{
        latitude:Number,
        longitude:Number
    },
    currentDate:Date,
    endDate:Date,
    budget:Number,
    TaskBidderList:{
        TaskBidderId:String,
        bidAmount:Number
    }
})
const BidListModel=mongoose.model('BidList',BidListSchema)
module.exports=BidListModel;