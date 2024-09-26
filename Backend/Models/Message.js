const mongoose=require("mongoose")

const messageSchema=new mongoose.Schema({
    taskId:{
        type:mongoose.Types.ObjectId,
        ref:'Task',
        default:null
    },
    
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        default:null
    },
    bidderId:{
        type:mongoose.Types.ObjectId,
        ref:'Bidder',
        default:null
    },
    time:{
        type:Date,
        default:Date.now()
    }
    ,message:{
        type:String,
        default:null
    }


})
const MessageModel=mongoose.model('Message',messageSchema)
module.exports=MessageModel;