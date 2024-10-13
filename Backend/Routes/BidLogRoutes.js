const express=require("express")
const router = express.Router()

const {getAllBidsForTask,getAllBidsForBidder}=require("../Controllers/BidLogController");

router.route("/log-task")
        .get(getAllBidsForTask)
router.route("/log-bidder")
        .get(getAllBidsForBidder)



module.exports = router
