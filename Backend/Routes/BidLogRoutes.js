const express=require("express")
const router = express.Router()

const {getAllBidsForTask}=require("../Controllers/BidLogController");

router.route("/log-task")
        .get(getAllBidsForTask)



module.exports = router
