const express=require('express')
const multer = require("multer");
const router=express.Router()

const {addFile, getFile}=require('../Controllers/FileUpload')
const upload = multer();


router.post('/upload',upload.array('files'),addFile);

router.get('/get/:id',getFile)

module.exports = router




