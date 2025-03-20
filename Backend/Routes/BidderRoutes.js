const express = require('express');
const router = express.Router();
const auth = require('../Middleware/authMiddleware');
const { addBidder, getAllBidder, bidderLogin, addLogToBidder, getBidderById } = require("../Controllers/Bidder");

// Public routes
router.post("/sign-up", addBidder);
router.post("/login", bidderLogin);

// Protected routes
router.use(auth);
router.get("/getall", getAllBidder);
router.get("/get-by-id", getBidderById);

module.exports = router;
