const TaskModel=require('../Models/Task');
const {addLogToBidder}=require("../Controllers/Bidder");






// add task 
async function addTask(req, res)  {
    try {
        // LOCATION MATTUM eduthuttu others aa ...taskData la pottu vachuruvom
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


async function addLog(req,res){
     addLogToBidder(req,res);
    console.log(req.body.TaskId);
    const task=await TaskModel.findById(req.body.TaskId);
     task.BidderList.push(req.body.BidderId);
    await task.save();

    res.json(task);
}

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
async function markAsCompleted(req,res){
    try{
        const task=await TaskModel.findById(req.body.TaskId);
        task.completedBy=req.body.BidderId;
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


async function getTasksForBidder(req, res) {
    const { longitude, latitude, bidderSkills } = req.body;
    
    try {
        const distance = 25 / 6378.1;  // 25 km in radians

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
                    skills: { $in: bidderSkills }  
                }
            ]
        })
        .select('taskName userId endDate budget BidderList imageIds completedBy location -_id');  // Project the required fields

        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching tasks" });
    }
}


module.exports={addTask,addLog,getAllTask,markAsCompleted,getTasksForBidder};