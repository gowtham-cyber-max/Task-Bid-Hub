const express = require('express')
const router = express.Router()
const auth = require('../Middleware/authMiddleware')

const { addUser,getAllUser,login} = require('../Controllers/User')

const {userTasks, getTaskForNotifyToComplete}=require("../Controllers/Task")
//public urls
router.route('/sign-up')
       .post(addUser)
router.route('/login')
              .post(login)

// below urls are protected so auth use here instead of hardcoding

router.use(auth);
//belows now protected
router.route('/getall')
       .get(getAllUser)

router.route('/my-task')
       .get(userTasks)

router.route("/get-notification")
       .get(getTaskForNotifyToComplete)

module.exports = router