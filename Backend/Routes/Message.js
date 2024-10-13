const express=require("express")
const router=express.Router()

const {addOneMessage,getMessageByIds,deleteOneMessage,deleteTaskMessage,getMessageByLog}=require("../Controllers/Message");

router.route("/new-message")
        .post(addOneMessage);
router.route("/get-message")
        .get(getMessageByIds);
router.route("/get-message-bid-log")
        .get(getMessageByLog);
router.route("/del-one-message")
        .delete(deleteOneMessage);
router.route("/del-all-task-message")
        .delete(deleteTaskMessage);

module.exports=router;