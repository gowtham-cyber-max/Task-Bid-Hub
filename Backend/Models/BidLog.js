const mongoose=require("mongoose")

const BidLogSchema=mongoose.Schema({
    BidderId:{
        type:mongoose.Types.ObjectId,
        ref:'Bidder',
        required:(true,"bidder id empty")
    },
    TaskId:{
        type:mongoose.Types.ObjectId,
        ref:'Task',
        required:(true,"task id empty")
    },
    UserId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:(true,"user id empty")
    },
    Amount:{
        type:Number
    },
    Description:{       
        type:String
    },
    Availability:{
        type:Date
    }

});

const BidLogModel=mongoose.model("BidLog",BidLogSchema);
module.exports=BidLogModel;