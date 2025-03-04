const UserModel=require("../Models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
async function addUser(req, res){
    console.log(req.body);
    const userdata = req.body;
    const user = new UserModel(userdata);
    try{
        let existUser= await UserModel.findOne({ email:user.email });
        if(existUser){
            return res.status(400).json({ message: "User already exists" });
        }
        await user.save();

        const payload={
            user:{
                id:user.id,
            },

        };

        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) throw err;
              // Set token as httpOnly cookie
              res.cookie('token', token, {
                httpOnly: true,
                 secure:true , // Use secure flag in production
                sameSite: 'lax' // or 'strict' based on your needs
              });
              // You can also return user info if needed
              res.json({ user: user });
            }
          );


    }
    catch(er){
        console.log(er);
        res.status(500).json({ message: "Internal Server Error" });
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
        const user = await UserModel.findOne({ $or: [{ email: req.body.email }, { name: req.body.email }] });
        const {email,passWord}=req.body;
        console.log(email+"   "+passWord);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
            const isMatch = await bcrypt.compare(req.body.passWord, user.pass);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid email or password" });

            } 

            const payload={
                user:{
                    id:user._id,
                },
            };

            jwt.sign(
                payload,
                process.env.SECRET_KEY,
                { expiresIn: "1h" },
                (err, token) => {
                  if (err) throw err;
                  // Set token as httpOnly cookie
                  res.cookie('token', token, {
                    httpOnly: true,
                     secure:true , // Use secure flag in production
                    sameSite: 'lax' // or 'strict' based on your needs
                  });
                  // You can also return user info if needed
                  res.json({ user: user });
                }
              );

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting user" });
    }
};


module.exports={addUser,getAllUser,login};