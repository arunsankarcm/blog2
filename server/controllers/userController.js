const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.signUp = async(req,res) => {
    const{username,password} = req.body;
    try{
        const existingUser = await User.findOne({username})

        if(existingUser){
            return res.status(400).json({message:'username already exists'})
        }
        const newUser = new User({username,password});
        await newUser.save();
        res.status(201).json({message:'user created successfully'});
    }catch(error){
        res.status(500).json({message:'server error'});
    }
}


exports.userLogin = async(req,res) => {
    const { username, password } = req.body;
try{
    const user = await User.findOne({username,password});
    if(!user){
        return res.status(401).json({message:'Invalid credentials'});
    }

    const token = jwt.sign({ userId: user._id, admin: user.admin }, process.env.JWT_SECRET);
    res.json({
        token: token,
        isAdmin: user.admin 
    });
}catch(error) {
    res.status(500).json({message:'Server Error'});
}
};



