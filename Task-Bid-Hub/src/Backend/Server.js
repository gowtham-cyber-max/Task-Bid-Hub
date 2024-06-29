const express = require("express");
const mongoose=require('mongoose')
const cors= require('cors')
const UserModel=require('./Models/User')
const Mongoclient=require("mongodb").MongoClient;
const multer=require("multer")
//.env ya access panna
const dotenv=require('dotenv');
const { json } = require("react-router-dom");
dotenv.config({path:'./.env'});

// itha use panni access pannikalam 
// process.env.MONGODB_URI


const app = express(); 
app.use(express.json());
app.use(cors());

//conection





const DATABASENAME="Tasks";
var database;
async function connectToMongo() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connection established");
      console.log("Server is running on port 5000");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  
  connectToMongo();
  
  
  //getter
  //const upload = multer({ dest: './uploads/' });
  app.post("/newuser/register", async (req, res) => {
    const user = new UserModel({
      userName: req.body.data.userName,
      email: req.body.data.email,
      passWord: req.body.data.pass
    });
    try {
      await user.save();
      console.log(user);
      res.json({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating user" });
    }
  });
  
app.get("/get/alluser",async(req,res)=>{
  try{
    const user=await UserModel.find();
    res.json(user);
    }catch(err){
      console.error(err);
      res.status(500).json({message:"Error getting user"}
        );
        }
})
app.post("/login",async(req,res)=>{
  try{
    const user=await UserModel.findOne({$or:[{email:req.body.data.email },{userName:req.body.data.email }]});
    
    if(user){
      if(user.passWord===req.body.data.passWord){
        res.json("success");
      }
      else{
        res.json("fail");
        }
    }
    else{
      res.json("not exist");
    }

    }catch(err){
      console.error(err);
      res.status(500).json({message:"Error getting user"}
        );
        }
})


app.listen(5000, () => {
    console.log("hi");
})