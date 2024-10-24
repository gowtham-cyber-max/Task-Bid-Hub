const mongoose=require("mongoose")

const BidLogSchema=mongoose.Schema({
    bidderId:{
        type:mongoose.Types.ObjectId,
        ref:'Bidder',
        required:(true,"bidder id empty")
    },
    taskId:{
        type:mongoose.Types.ObjectId,
        ref:'Task',
        required:(true,"task id empty")
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:(true,"user id empty")
    },
    amount:{
        type:Number
    },
    description:{       
        type:String
    },
    availability:{
        type:Date
    },
    accepted:{
        type:Boolean,
        default:false
    },
    start:{
        type:Date,
        default:null
    },
    end:{
        type:Date,
        default:null,
    },
    complete:{
        type:Boolean,
        default:false
    }

});

const BidLogModel=mongoose.model("BidLog",BidLogSchema);
module.exports=BidLogModel;