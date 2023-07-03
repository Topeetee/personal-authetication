const express = require("express");
require ("dotenv").config();
const mongoose = require("mongoose");
const errmsg = require("./utils/error")
const cookieParser = require("cookie-parser");
const verifyRoute = require("./routes/verify")
const userRoute = require("./routes/user")


const app = express();
app.use( cookieParser());
app.use(express.json());

const connect = async()=>{
    try{
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("connected to my mongoDb")
    }catch(err){
        throw err;
    }
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log ("Connected successfully");
});
connect();

app.use("/api/", verifyRoute)
app.use("/api/user", userRoute)

app.use((err,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "somethine went wrong"
    return res.status(errorStatus).json({
        success:false,  
        
        status:errorStatus,
        messgae: errorMessage,
        stack: err.stack
      })
})

app.listen(3000, ()=>{ connect() 
    console.log("connected to the port")});