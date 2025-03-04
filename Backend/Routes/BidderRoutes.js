const express = require('express')
const router = express.Router()

const {addBidder,getAllBidder,bidderLogin, addLogToBidder, getBidderById}=require("../Controllers/Bidder")

router.route("/sign-up")
        .post(addBidder)


router.route("/getall")
        .get(getAllBidder)

router.route("/login")
        .post(bidderLogin);
router.route("/get-by-id")
        .get(getBidderById);





module.exports = router