const User = require("../model/User");
const express = require("express")
const {verifyToken,verifyUser, verifyAdmin} = require("../utils/token");
const { updateUser, deleteUser, getUser, getUsers } = require("../controller/user")

const router = express.Router();
router.put("/:id", verifyUser,updateUser)
router.delete("/:id",verifyUser,deleteUser)
router.get("/:id",verifyUser,getUser)
router.get("/",verifyAdmin,getUsers)  

module.exports = router;