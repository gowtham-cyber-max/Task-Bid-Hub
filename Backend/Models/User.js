const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    mobile:String,
    taskList:{
        type:[mongoose.Types.ObjectId],
        ref:"Task",
        default:[]
    }
})
const UserModel=mongoose.model('User',userSchema)
module.exports=UserModel