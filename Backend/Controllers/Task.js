const TaskModel=require('../Models/Task');

const {otpGenerator}=require("../Controllers/Components")

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


// add new task 
async function addTask(req, res)  {
    try {
        // LOCATION MATTUM eduthuttu others aa ...taskData la pottu vachuruvom
        console.log(req.body);
        const { longitude, latitude, ...taskData } = req.body; //separate longitude and latitude

        if (!longitude || !latitude) {
            return res.status(400).json({ message: "Longitude and latitude are required" });
        }

        const task = new TaskModel({
            ...taskData,  // Spread the rest of the task data
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]  // Longitude comes first, then latitude
            }
        });

        await task.save();

        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating task" });
    }
};


// add one bid into both task model and bidder model
async function addLogToTask(req, res) {
    try {
       
        console.log(req.body)
        const task = await TaskModel.findById(req.body.taskId);
        if (task) {
            task.bidderList.push(req.body.bidderId);
            await task.save();
            return task;
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (er) {
        console.log(er);
        res.status(500).json({ message: "Error adding log" });
    }
}


// get all task from the task model
async function getAllTask(req,res){
    try{
        const task=await TaskModel.find();
        res.json(task);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: "Error fetching task" });
            }

}

// mark one task completed after all process
async function TaskMarkAsCompleted(req,res){
    try{
        const task=await TaskModel.findById(req.body.taskId);
        if(task){

            task.completedBy=req.body.bidderId;
            await task.save();
            return task;
        }
    }
    catch(err){
            console.error(err);
            res.status(500).json({ message: "Error marking task as completed" });
    }
}

// get all bidders and by skills and use the $geoWithin to get the tasks within 20 km

// 2dsphere Index on chatgpt  https://chatgpt.com/share/66f52fec-96bc-8013-8836-37979f50723b find using $geoWithin 


// get tasks for the bidder based on location and skill set
async function getTasksForBidder(req, res) {
    console.log(req.body);
    const { longitude, latitude, skills, radiusKM} = req.body;
    if (!(latitude) || !(longitude)) {
        return res.status(400).json({ error: "Invalid latitude or longitude" });
    }
    
    // Ensure radiusKM is a valid number
    const radius = isNaN(radiusKM) ? 25 : radiusKM;  
    try {
        const distance = radius/ 6378.1;
        const tasks = await TaskModel.find({
            $and: [
                {
                    location: {
                        $geoWithin: {
                            $centerSphere: [
                                [parseFloat(longitude), parseFloat(latitude)],  // Corrected longitude and latitude
                                distance
                            ]
                        }
                    }
                },
                {
                    skills: { $in: skills }  
                }
            ]
        })
        .select('taskName taskDescription userId endDate budget bidderList imageIds completedBy location views skills _id postedDate');  // Project the required fields
        
        console.log(tasks);
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching tasks" });
    }
}


// after messaging user will select that bidder for their task by accept
async function TaskAccepted(req,res){

    const {taskId,bidderId}=req.body;
    try{
        otpGenerator(req,res);
        const task=await TaskModel.findById(taskId);
        if(task){
        task.allogatedTo=bidderId;
        task.otp=res.otp;
        await task.save();
        return task;
        }
        return null;
    }
    catch(er){
        console.log(er);
        res.status(500).json({message:"Error accepting task"})
    }
}

// bidder send the completed request to the task which is accepted by the user and declare task is completed
async function setTheRequest(req,res){
    const {taskId}=req.body;
    try{
        const task=await TaskModel.findById(taskId);
        task.completeRequest=true;
        await task.save();
        return task;
    }
    catch(er){
        console.log(er);
        res.status(500).json({ message: "Error setting request" });


    }
}

// add the views
async function addViews(req,res){
    try{
        const id=req.body.taskId;

        const task=await TaskModel.findById(id);
        if(task){
        task.views+=1;
        await task.save();

        res.json(task)
    }
        else{
                res.status(201);
        }
    }
    catch(er){
        console.log(er);
    }
}
// taskList for users
async function userTasks(req,res){
    const userId=req.query.userId;
    try{
    const task=await TaskModel.find({userId:userId});
    if(task){
        res.json(task);
    }
    else{
        res.status(201);
    }

    }
    catch(er){
        console.log(er);
    }
}
async function getOtpForTask(req,res){
    const taskId=req.query.taskId;
    try{
        const task=await TaskModel.findById(taskId);
        if(task){
            res.json({otp:task.otp});
        }
    }
    catch(er){
        console.log(er);
    }
}
async function otpValidation(req,res){
    const {taskId,otp}=req.body;
    try{
        const task=await TaskModel.findById(taskId);
        if(task && task.otp===otp){
            return true;
        }
        else{
            return false;
        }
    }
    catch(er){
        console.log(er);   
    }
}
async function completedTaskList(req,res){
    const id=req.query.id;

    if(!id){
        res.status(400).json({message:"Please provide user id"});
    }
    console.log(id)
    try{
        const task = await TaskModel.find({
        $or: [
          { userId: id, completedBy: { $ne: null } },//ne= not equal
          { allogatedTo: id, completedBy: { $ne: null }}
        ]
      });
      
        if(task){
            res.json(task);
        }
        else{
            res.status(404).json([]);
        }
    }
    catch(er){
        console.log(er);
    }
}
async function getTaskForNotifyToComplete(req,res){
    const id=req.query.userId;
    console.log(id);
    try{
        const task = await TaskModel.find({userId:new ObjectId(id)});
        console.log(task)
        if(task){
            res.json(task);
          }
        else{
               res.json([]);
         }            
    }
    catch(er){
        console.log(er);
    }
}


module.exports={addTask,addLogToTask,getAllTask,TaskMarkAsCompleted,getTasksForBidder,TaskAccepted,userTasks,setTheRequest,addViews,getOtpForTask,otpValidation,completedTaskList,getTaskForNotifyToComplete};