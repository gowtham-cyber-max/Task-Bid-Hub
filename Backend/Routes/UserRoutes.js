const express = require('express')
const router = express.Router()

const { addUser} = require('../Controllers/User')

router.route('/register')
       .post(addUser)

module.exports = router