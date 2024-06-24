const express = require("express");
const app = express(); 
//const cors= require('cors')
app.use(express.json());
//app.use(cors());
//getter

app.get("/api1"  ,(req , res) => {
    
    res.json({ "users": ["use","peace","ans",
        "user1","user2","user3"]})    //I will send the json format so I use that res.json mostly use that format
    
    })
app.listen( 5000,() => { console.log("server in 5000") } )  