const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config();


const auth = async(req,res,next)=>{
const token = req.headers.authorization.split(" ")[1];

try {
    let existingtoken = await BlacklistModel.find({
        blacklist: {$in: token}
        });
        if(existingtoken){
            res.status(200).json("Please login");
        }else{
            const decodeing = jwt.verify(token,process.env.SECRET);
            req.body.userID = decodeing.userID;
            next();
        }
} catch (error) {
    res.status(400).json({error: error.message});
}
}

module.exports = {auth}