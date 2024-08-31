const UserModel=require('../Models/User');

// User registration
// app.post("/newuser/register", async (req, res) => {
//     const user = new UserModel({
//         userName: req.body.data.userName,
//         email: req.body.data.email,
//         passWord: req.body.data.pass
//     });
//     try {
//         await user.save();
//         res.json({ message: "User created successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error creating user" });
//     }
// });

// Get all users
async function getAllUser(req, res){
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting users" });
    }
};

// // User login
// app.post("/login", async (req, res) => {
//     try {
//         const user = await UserModel.findOne({ $or: [{ email: req.body.data.email }, { userName: req.body.data.email }] });

//         if (user) {
//             if (user.passWord === req.body.data.passWord) {
//                 res.json("success");
//             } else {
//                 res.json("fail");
//             }
//         } else {
//             res.json("not exist");
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error getting user" });
//     }
// });

// // Bid posting 
// app.post("/upload/bid", async (req, res) => {
//     const bid = new BidListModel(req.body);
//     try {
//         await bid.save();
//         res.json(bid);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error uploading bid" });
//     }
// });

// // Task posting 
// app.post("/upload/taskbidder", async (req, res) => {
//     const taskBidder = new TaskBidderModel(req.body);
//     try {
//         await taskBidder.save();
//         res.json(taskBidder);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error uploading task" });
//     }
// });

module.exports={getAllUser};