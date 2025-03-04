const mongoose=require('mongoose')
const bcrypt = require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    taskList:{
        type:[mongoose.Types.ObjectId],
        ref:"Task",
        default:[]
    }
});
userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('pass')){
        user.pass=await bcrypt.hash(user.pass,10);
    }
    next();
});
const UserModel=mongoose.model('User',userSchema)
module.exports=UserModel