const express = require('express')
const router = express.Router()

const {addTask,addLog,getAllTask,markAsCompleted}=require("../Controllers/Task")

router.route("/addnew")
        .post(addTask)

router.route("/addlog")
        .post(addLog)

router.route("/getall")
        .get(getAllTask)

router.route("/completedby")
        .put(markAsCompleted)




module.exports = router