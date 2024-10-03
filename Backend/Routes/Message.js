const express=require("express")
const router=express.Router()

const {addOneMessage,getMessage,deleteOneMessage,deleteTaskMessage}=require("../Controllers/Message");

router.route("/new-message")
        .post(addOneMessage);
router.route("/get-message")
        .get(getMessage);
router.route("/del-one-message")
        .delete(deleteOneMessage);
router.route("/del-all-task-message")
        .delete(deleteTaskMessage);

module.exports=router;