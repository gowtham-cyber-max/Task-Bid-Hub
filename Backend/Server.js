const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongo=require("./DB/mongo");
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
const BidderRoutes=require("./Routes/BidderRoutes")
const TaskRoutes=require("./Routes/TaskRoutes")


app.use("/user",userRoutes);

app.use("/file",fileRoutes);

app.use("/task",TaskRoutes);

app.use("/bidder",BidderRoutes);



app.listen(5000, () => {
  console.log('Server is running on port 5000');
  console.log('Are you ready to check me');
});

