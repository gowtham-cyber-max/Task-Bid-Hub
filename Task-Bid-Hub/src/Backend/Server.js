const express = require("express");
const app = express(); 
const cors= require('cors')
app.use(express.json());
app.use(cors());
//getter
app.post("/newuser/register",(req,res)=>{
    res.json("sucess");
})

app.listen( 5000,() => { console.log("server in 5000") } )  