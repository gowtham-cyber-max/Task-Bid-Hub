const express=require("express")
const router=express.Router();

const {getSkillSet}=require("../Controllers/Components")

router.route("/getskillset")
    .get(getSkillSet)

module.exports=router;