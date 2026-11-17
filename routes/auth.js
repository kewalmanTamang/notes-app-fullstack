const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router(); 

const auth = require("../middleware/auth")

const bcrypt = require("bcrypt"); 
const User = require("../models/User"); 

router.post("/signup", async(req,res) =>{
  try{
    const email = req.body.email; 
    const password = req.body.password;
    if(!email || !password === null){
      return res.status(400).json({error:"Email and password are required"})
    } 
 const existing = await User.findOne({email: email.toLowerCase()});
 if(existing){
  return res.status(409).json({error: "email already registered! "})
 }
  const hashedPassword = await bcrypt.hash(password,10);
  await User.create({email, password: hashedPassword});
  res.status(201).json({message: "User successfully created! "})
  } catch(error){
    console.log(error);
    res.status(500).json({error: error.message})
  }
})

router.post("/login", async(req, res) =>{
  try{
    const email = req.body.email; 
    const password = req.body.password; 
    if(!email || !password){
      return res.status(400).json({error: "Email and password are required"})
    } 
    const user = await User.findOne({email: email.toLowerCase()})
    if(!user){
     return res.status(401).json({error:" Invalid email or password "})
    }

const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch){
  return res.status(401).json({error: "Invalid email or password "})
} 
 const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{
  expiresIn: "7d",
 }); 
 res.json({token});
  } catch(error){
    console.log(error);
    res.status(500).json({error: error.message})
  }
})
router.get("/me",auth,(req,res) =>{
  console.log("req.userId is: ", req.userId);
  res.json({userId: req.userId});
})

module.exports = router; 