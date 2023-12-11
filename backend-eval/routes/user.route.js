const {Router} = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config();

const useRouter = Router();


// Registration /// 
useRouter.post("/register",async(res,req)=>{

try {
    const email = req.body.email;
    const user = await UserModel.finfOne({email});
    if(user){
        res.status(200).json({msg:"User already exists"});
    }else{
        bcrypt.hash(req.body.password, 10,async(err,hash)=>{
            if(hash){
                const newUser = new UserModel({...req.body, password:hash});
                await newUser.save();

                res.status(200).json({mag:"Registration succecssfully"});
            }
        } );
    }
    
} catch (error) {
    res.status(400).json({error:error.message})
}
})

//Login///
useRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.finfOne({email});
        if(user){
            bcrypt.compare(password,user.password,(error, result)=>{
              if(result){
                var token = jwt.sign({userID: user._id}, process.env.SECRET);
                res.status(200).json({mgs:"User logged in successfully"})
              }else{
                res.status(200).json({msg:"Incorrect credential"})
              }
            })
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})



// Logout////
useRouter.post("/logout", async(res,req)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1] || null;
        if(token){
            await BlacklistModel.updateMany({},{$push: {blacklist : [token]}});
            res.status(200).send("Logout successfully");
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})


module.exports = {useRouter}