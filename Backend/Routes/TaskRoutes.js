const express = require('express')
const router = express.Router()

const {addTask,getAllTask,getTasksForBidder,addViews,userTasks, getOtpForTask}=require("../Controllers/Task")

const {addBidLog,markAsCompleted,Accepted, otpValidateStarWork}=require("../Controllers/Circular");
        router.route("/addnew")
                .post(addTask)

        
        router.route("/getall")
                .get(getAllTask)
        
        
        router.route("/getforbidders")
                .post(getTasksForBidder)
        
        
        router.route("/add-view")
                .post(addViews)

        router.route("/get-task-user")
                .get(userTasks)
        router.route("/get-task-otp")
                .get(getOtpForTask)
        // ---------------------------- circular

        router.route("/addlog")
                .post(addBidLog)
        
        router.route("/accepted")
                .post(Accepted)

        router.route("/completedby")
                .put(markAsCompleted)
                
        router.route("/validate-start")
                .post(otpValidateStarWork)

        // complete request circularcd


               
                
module.exports = router