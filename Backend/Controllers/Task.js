const TaskModel=require('../Models/Task');







// add task 
async function addTask(req, res)  {
    const bid = new TaskModel(req.body);
    try {
        await bid.save();
        res.json(bid);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading bid" });
    }
};



module.exports={addTask};