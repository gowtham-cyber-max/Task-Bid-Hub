const express = require('express')
const router = express.Router()

const {addTask}=require("../Controllers/Task")

router.route("/addnew")
        .post(addTask)




module.exports = router