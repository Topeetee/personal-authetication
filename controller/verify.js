const User = require("../model/User");
const bcrypt = require('bcryptjs');
const validator = require("email-validator");
const createError = require("../utils/error")
var jwt = require('jsonwebtoken');
require('dotenv').config(); 

const createUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const email = req.body.email;
    const username = req.body.username; // Get the username from the request body

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    if (!validator.validate(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    const user = new User({
      username: username,
      email: email,
      password: hash,
    });

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


const login = async(req,res,next)=>{
    try {
        const username = req.body.username
        const user = await User.findOne({username:username})    
        if(!user) return next(createError(404, "user not found"));  
        const isPasswordCorrect =  await bcrypt .compare( req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, "wrong password"));

        const token = jwt.sign(
            {id:user._id, isAdmin:user.isAdmin},
            process.env.JWT,{ expiresIn: '1h' });
            const{password,isAdmin, ...otherdDetails} = user._doc;
        res.cookie("access_token",
        token, {httpOnly:true,}).status(200).json(otherdDetails);

    } catch (err) {
        next(err)
    }

}
module.exports = { createUser,login };
