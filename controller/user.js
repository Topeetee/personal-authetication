const User = require("../model/User")

const updateUser = async(req,res,next)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(user)
    } catch (err) {
      next(err)  
    }
}
const deleteUser = async(req,res,next)=>{
    try {
        const deleted = await User.findByIdAndDelete(req.param.id)
        if(!deleted){
            res.status(404).json("user doesn't exist")
        }
        res.status(200).json("user has been deleted")
    } catch (error) {
        next(error)
    }

}

const getUser = async(req,res,next)=>{
    try {
        const getuser = await User.findById(req.param.id)
        if(!getuser){
            res.status(404).json("user not found")
        }
    res.status(200).json(getuser)
    } catch (error) {
        next(error)
    }
   
}

const getUsers = async(req,res,next)=>{
    try {
        const getusers = await User.find()
        if(!getusers){
            res.status(404).json("no current user")
        }
        res.status(200).json(getusers)
    } catch (error) {
        next(error)
    }
  
}

module.exports = {getUser,getUsers,deleteUser,updateUser}