const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express(); 

//getter

app.get("/api"  ,(req , res) => {
    
    res.json({ "users": ["use","peace","ans"]})    //I will send the json format so I use that res.json mostly use that format
    
    })

    app.use(cors(corsOptions));
app.listen( 5173,() => { console.log("server in 5000") } )  