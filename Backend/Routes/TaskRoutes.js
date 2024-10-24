const express = require('express')
const router = express.Router()

const {addTask,getAllTask,getTasksForBidder,addViews,userTasks, getOtpForTask, completedTaskList}=require("../Controllers/Task")

const {addBidLog,markAsCompleted,Accepted, otpValidateStarWork, CompleteRequestToUser}=require("../Controllers/Circular");
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


        router.route("/get-completed-task")
                .get(completedTaskList)

        router.route("/complete-request")
                .post(CompleteRequestToUser)

        
        // ---------------------------- circular

        router.route("/addlog")
                .post(addBidLog)
        
        router.route("/accepted")
                .post(Accepted)

        router.route("/complete-approve")
                .post(markAsCompleted)
                
        router.route("/validate-start")
                .post(otpValidateStarWork)

        // complete request circularcd


               
                
module.exports = router