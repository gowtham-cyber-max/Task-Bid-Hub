const express = require('express')
const router = express.Router()

const { addUser,getAllUser,login} = require('../Controllers/User')

const {userTasks, getTaskForNotifyToComplete}=require("../Controllers/Task")
router.route('/sign-up')
       .post(addUser)

router.route('/getall')
       .get(getAllUser)
router.route('/login')
       .post(login)

router.route('/my-task')
       .get(userTasks)

router.route("/get-notification")
       .get(getTaskForNotifyToComplete)

module.exports = router