const express=require("express")
const router=express.Router();

const {getSkillSet,otpGenerator}=require("../Controllers/Components")

router.route("/getskills")
    .get(getSkillSet)

router.route("/otp")
    .get(otpGenerator)

module.exports=router;