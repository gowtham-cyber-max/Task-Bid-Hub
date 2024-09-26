const express = require('express')
const router = express.Router()

const {addBidder,getAllBidder}=require("../Controllers/Bidder")

router.route("/addnew")
        .post(addBidder)


router.route("/getall")
        .get(getAllBidder)







module.exports = router