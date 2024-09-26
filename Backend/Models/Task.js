const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskName: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "user id is empty"]
    },
    taskDescription: String,
    currentDate: {
        type: Date,
        default: Date.now  
    },
    endDate: Date,
    budget: Number,
    BidderList: {
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
        ref: 'Bidder',
        default: null
    },
    completedAt: {
        type: Date
    },
    location: {
        type: { type: String, enum: ['Point'], required: true },  //  GeoJSON format
        coordinates: { type: [Number], required: true }
    }
});
// 2d sphere
TaskSchema.index({ location: "2dsphere" });

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;
