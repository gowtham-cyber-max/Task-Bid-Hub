const express = require('express')
const router = express.Router()

const {addTask,getAllTask,getTasksForBidder,addViews}=require("../Controllers/Task")

const {addBidLog,markAsCompleted,Accepted}=require("../Controllers/Circular");
        router.route("/addnew")
                .post(addTask)

        
        router.route("/getall")
                .get(getAllTask)
        
        
        router.route("/getforbidders")
                .post(getTasksForBidder)
        
        
        router.route("/add-view")
                .post(addViews)
        // ---------------------------- circular

        router.route("/addlog")
                .post(addBidLog)
        
        router.route("/accepted")
                .post(Accepted)

        router.route("/completedby")
                .put(markAsCompleted)
                
module.exports = router