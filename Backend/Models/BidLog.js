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
    Amount:{
        type:number
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