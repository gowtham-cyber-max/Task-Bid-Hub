const express = require("express");
const mongoose=require('mongoose')
const cors= require('cors')
const UserModel=require('./Models/User')
const Mongoclient=require("mongodb").MongoClient;
const multer=require("multer")
//.env ya access panna
const dotenv=require('dotenv')
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
      await mongoose.connect("mongodb+srv://gowtham-cyber-max:GoWtHaM%404262472@tasks.e1xhnw2.mongodb.net/?retryWrites=true&w=majority&appName=Tasks");
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
app.listen(5000, () => {
    console.log("hi");
})