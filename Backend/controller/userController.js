const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// const {json} = require("express");


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET ,{
        expiresIn : "1d"
    })
}
//Register User
const registerUser = asyncHandler(async(req,res)=>{
    const {name ,email,password}=req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill in all required fiels")
    }
    if(password.length <6){
        res.status(400);
        throw new Error("password must be up to 6 characters");
    }
    // check if user exists
    const userExists = await User.findOne({email})
       if(userExists){
        res.status(400);
        throw new Error("Email has already been registered");
       }
       //Create new User
       const user = await User.create({
        name,
        email,
        password
       })
       // generate token
       const token = generateToken(user._id)
       if(user){
        const {_id , name , email , role} = user
            res.cookie("token",token,{
                path: "/",
                httpOnly:true,
                expires: new Date(Date.now()+1000*86400),
                // secure : true,
                // sameSite :none,
             })
             // send user data
             res.status(201).json({
                _id ,
                name,
                email,
                role,
                token
             })
       }else{
        res.status(400);
        throw new Error("Invalid user data")
       }

    res.send("Register User...");
});
// login 
 const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    //validate
    if(!email || !password){
        res.status(400);
        throw new Error("Please add email and password");
    }
    const user = await User.findOne({email});
    //useresxist , check if password is corresct
    const passwordIsCorrect = await bcrypt.compare(password, user.password)
    //generate token 
    const token = generateToken(user._id);
    if(user && passwordIsCorrect){
        const newUser = await User.findOne({email}).select("-password")
        res.cookie("token",token,{
            path: "/",
            httpOnly:true,
            expires: new Date(Date.now()+1000*86400),
            // secure : true,
            // sameSite :none,
         })
         // send user data
         res.status(201).json(newUser)

    }else{
        res.status(400);
        throw new Error("Invalid email or password");
    }
    
 });

 //Logout user 

 const logout = asyncHandler(async(req,res)=>{
    res.cookie("token","",{
        path: "/",
        httpOnly:true,
        expires: new Date(0),
        // secure : true,
        // sameSite :none,
     })
     return res.status(200).json({message :"Successfully logged out"})
 });

 // Get User
  
const getUser = asyncHandler(async(req,res)=>{
    const user  = await User.findOne(req.user._id).select("-password")
    if(user){
        res.status(200).json(user)
        throw new Error("User not found")
    }
});
//Get Login Status
const getLoginStatus = asyncHandler(async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
       return res.json(false)
    }
    const verified = jwt.verify(token,process.env.JWT_SECRET)
    //get use id from token
    if(verified){
        res.json(true);
    }
    else{
    res.json(false)
    }

});
//update user
const updateUser = asyncHandler(async(req,res)=>{
    const user  = await User.findById(req.user._id);
    if(user){
        const { name,phone,address} = user;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.address = req.body.address || address;


        const updatedUser = await user.save();
        res.status(200).json(updatedUser)
    }
    else{
        es.status(404);
        throw new Error("User not found")

    }
    
})
//update photo 
const updatePhoto = asyncHandler(async(req,res)=>{
    const {photo} = req.body;
    const user = await User.findById(req.user._id);
    user.photo = photo
    const updatedUser = await user.save();
    res.status(200).json(updatedUser)

})

module.exports ={
    registerUser,
    loginUser,
    logout,
    getUser,
    getLoginStatus,
    updateUser,
    updatePhoto,
}