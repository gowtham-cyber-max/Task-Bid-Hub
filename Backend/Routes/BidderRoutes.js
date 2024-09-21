const express = require('express')
const router = express.Router()

const {addBidder}=require("../Controllers/Bidder")

router.route("/addnew")
        .post(addBidder)










module.exports = router