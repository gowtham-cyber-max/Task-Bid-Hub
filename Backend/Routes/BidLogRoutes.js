const express=require("express")
const router = express.Router()

const {getAllBidsForTask,getAllBidsForBidder,getBidLogByIds}=require("../Controllers/BidLogController");

router.route("/log-task")
        .get(getAllBidsForTask)
router.route("/log-bidder")
        .get(getAllBidsForBidder)

router.route("/get-bidder-ids")
        .get(getBidLogByIds)



module.exports = router
