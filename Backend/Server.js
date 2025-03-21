const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongo=require("./DB/mongo");
dotenv.config({ path: './.env' });
const cookieParser = require('cookie-parser');

// middle
const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const mongoURI = process.env.MONGODB_URI;

const conn=connectToMongo();



//routes
const userRoutes = require('./Routes/UserRoutes')
const fileRoutes=require('./Routes/FileRoutes')
const BidderRoutes=require("./Routes/BidderRoutes")
const TaskRoutes=require("./Routes/TaskRoutes")
const ComponentRoutes=require("./Routes/ComponentRoutes")
const MessageRoutes=require("./Routes/Message")
const BidLogRoutes=require("./Routes/BidLogRoutes")



app.use("/user",userRoutes);

app.use("/file",fileRoutes);

app.use("/task",TaskRoutes);

app.use("/bidder",BidderRoutes);

app.use("/components",ComponentRoutes);

app.use("/message",MessageRoutes);

app.use("/bid",BidLogRoutes);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
  console.log('Are you ready to check me');
});

