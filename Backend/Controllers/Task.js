const TaskModel=require('../Models/Task');
const {addLogToBidder,addTaskToQueue,addTaskToCompleted}=require("../Controllers/Bidder");

const {otpGenerator}=require("../Controllers/Components")




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
async function addLog(req,res){
    // add task into bidder model
     addLogToBidder(req,res);

    console.log(req.body.TaskId);
    const task=await TaskModel.findById(req.body.TaskId);
     task.BidderList.push(req.body.BidderId);
    await task.save();

    res.json(task);
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
async function markAsCompleted(req,res){
    try{
        addTaskToCompleted(req,res);
        const task=await TaskModel.findById(req.body.taskId);
        task.completedBy=req.body.bidderId;
        task.completedAt=Date.now();
        await task.save();
        res.json(task);
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
    const { longitude, latitude, skills, radiusKM = 20 } = req.body;
    if (!(latitude) || !(longitude)) {
        return res.status(400).json({ error: "Invalid latitude or longitude" });
    }
    
    // Ensure radiusKM is a valid number
    const radius = isNaN(radiusKM) ? 20 : radiusKM;  
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
        .select('taskName taskDescription userId endDate budget BidderList imageIds completedBy location views skills _id ');  // Project the required fields

        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching tasks" });
    }
}


// after messaging user will select that bidder for their task by accept
async function accepted(req,res){
    const {taskId,bidderId}=req.body;
    addTaskToQueue(req,res);
    try{
        otpGenerator(req,res);
        const task=await TaskModel.findById(taskId);
        task.allogatedTo=bidderId;
        task.allogatedDate=Date.now();
        task.otp=res.otp;
        await task.save();
        res.json(task);
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
        task.completeRequest=!task.completeRequest;
        await task.save();
    }
    catch(er){
        console.log(er);
        res.status(500).json({ message: "Error setting request" });


    }
}

// add the views
async function addViews(req,res){
    try{
        const id=req.query.id;
        const task=await TaskModel.findById(id);
        task.views+=1;
        await task.save();

        res.json(task)
    }
    catch(er){
        console.log(er);
    }
}

module.exports={addTask,addLog,getAllTask,markAsCompleted,getTasksForBidder,accepted,setTheRequest,addViews};