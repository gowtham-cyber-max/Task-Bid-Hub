const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectToMongo=require("./DB/mongo")
const { Readable } = require('stream');
const {getAllUser}=require("./Controllers/BidList")
const {addUser}=require("./Controllers/User");

dotenv.config({ path: './.env' });

// middle
const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;

const conn=connectToMongo();



//routes
const userRoutes = require('./Routes/UserRoutes')
const fileRoutes=require('./Routes/FileRoutes')


app.use("/newuser",userRoutes);

app.use("/file",fileRoutes)




app.get("/get/alluser", getAllUser);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

