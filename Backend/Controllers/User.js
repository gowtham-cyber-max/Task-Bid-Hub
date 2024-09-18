const UserModel=require("../Models/User")

// User registration
async function addUser(req, res){
    const userdata = req.body;
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


module.exports={addUser};