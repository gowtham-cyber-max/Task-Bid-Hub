const express = require('express')
const router = express.Router()

const {addTask,addLog,getAllTask,markAsCompleted,getTasksForBidder}=require("../Controllers/Task")

router.route("/addnew")
        .post(addTask)

router.route("/addlog")
        .post(addLog)

router.route("/getall")
        .get(getAllTask)

router.route("/completedby")
        .put(markAsCompleted)

router.route("/getforbidders")
        .get(getTasksForBidder)




module.exports = router