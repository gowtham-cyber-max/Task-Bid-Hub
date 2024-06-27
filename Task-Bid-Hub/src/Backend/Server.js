const express = require("express");
const mongoose=require('mongoose')
const cors= require('cors')
require("").config(); 
const UserModel=require('./Models/User')

const app = express(); 
app.use(express.json());
app.use(cors());

//conection
mongoose.connect('mongodb://127.0.01:27017/Tasks');



//getter
app.post("/newuser/register",(req,res)=>{
    UserModel.create(req.body)
    .then( user => res.json(user))
     .catch(err=>err.json(err))
})

app.listen( 5000,() => { console.log("server in 5000") } )  