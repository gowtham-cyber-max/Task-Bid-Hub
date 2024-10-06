const express = require('express')
const router = express.Router()

const {addBidder,getAllBidder,bidderLogin}=require("../Controllers/Bidder")

router.route("/sign-up")
        .post(addBidder)


router.route("/getall")
        .get(getAllBidder)

router.route("/login")
        .post(bidderLogin);





module.exports = router