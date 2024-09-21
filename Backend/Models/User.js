const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    userName:String,
    email:String,
    passWord:String,
    taskList:[String]
})
const UserModel=mongoose.model('User',userSchema)
module.exports=UserModel