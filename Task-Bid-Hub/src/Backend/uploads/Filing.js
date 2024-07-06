const mongoose=require('mongoose')

const file_upSchema=new mongoose.Schema({
    filename: String,
    length: Number,
    originalName: String,
    fileType:String
})
const File_up=mongoose.model('uploads', file_upSchema)
module.exports=File_up