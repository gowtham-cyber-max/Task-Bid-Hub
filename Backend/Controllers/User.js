const UserModel=require("../Models/User")

// User registration
async function addUser(req, res){
    const userdata = req.body.data;
    console.log(req.body); 
    
    const user = new UserModel(userdata);
    console.log(user);
    
    try {
        await user.save();
        res.json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating user" });
    }
};

async function getAllUser(req, res){
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting users" });
    }
};

//login

async function login(req, res){
    try {
        const user = await UserModel.findOne({ $or: [{ email: req.body.data.email }, { userName: req.body.data.email }] });

        if (user) {
            if (user.passWord === req.body.data.passWord) {
                res.json("success");
            } else {
                res.json("fail");
            }
        } else {
            res.json("not exist");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting user" });
    }
};


module.exports={addUser,getAllUser,login};