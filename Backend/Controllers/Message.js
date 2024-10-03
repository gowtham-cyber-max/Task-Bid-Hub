const MessageModel=require("../Models/Message")

//add Message
async function addOneMessage(req,res){
    try{
        const message=new MessageModel(req.body);
        await message.save();
        res.status(201).json(message);
    }
    catch(er){
        console.log(er)
    }
}

async function getMessage(req,res){
    try{
        const { taskId, userId, bidderId } = req.body;
        const message = await MessageModel.find({ taskId: taskId, userId: userId, bidderId: bidderId }).sort({ time: 1 });
        console.log(message);

        res.json(message);

    }
    catch(er){
        console.log(er)
    }
}
async function deleteOneMessage(req,res){
    try{
        const { id } = req.query;
        // give as axios params
        console.log(id);
        const message = await MessageModel.findByIdAndDelete(id);
        res.json(message);
        }
        catch(er){
            console.log(er);
        }
}
async function deleteTaskMessage(req,res){
    try{
        const { taskId } = req.query;
        console.log(taskId)
        const message = await MessageModel.deleteMany({taskId:taskId});
        res.json(message);
        }
        catch(er){
            console.log(er);
        }
}


module.exports={addOneMessage,getMessage,deleteOneMessage,deleteTaskMessage};