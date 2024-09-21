const express = require('express')
const router = express.Router()

const { addUser,getAllUser,login} = require('../Controllers/User')


router.route('/register')
       .post(addUser)

router.route('/getall')
       .get(getAllUser)
router.route('/login')
       .post(login)

module.exports = router