const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskName: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "user id is empty"]
    },
    taskDescription: String,
    postedDate: {
        type: Date,
        default: Date.now  
    },
    endDate: Date,
    budget: Number,
    bidderList: {
        type: [mongoose.Types.ObjectId],
        ref: 'BidLog',
        default: [],
    },
    imageIds: {
        type: [mongoose.Types.ObjectId],
        ref: 'File',
        default: []
    },
    completedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'BidLog',
        default: null
    },
    skills:{
        type: [String],
        default: []
    }
    ,
    location: {
        type: { type: String, enum: ['Point'], required: true },  //  GeoJSON format
        coordinates: { type: [Number], required: true }
    },
    otp:{
        type:Number,
        default:null
    },
    allogatedTo:{
        type: mongoose.Types.ObjectId,
        ref: 'BidLog',
        default: null
    },
    completeRequest:{
        type:Boolean,
        default:false
    },
    views:{
        type:Number,
        default:0
    }
});
// 2d sphere
TaskSchema.index({ location: "2dsphere" });

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;
