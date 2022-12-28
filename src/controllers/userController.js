const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//===========================================================
const createUser = async function(req,res){
    try {
        let data = req.body;
    let validData = Object.keys(data);
    if(validData.length==0) res.status(400).send({error : "Data is not provided"})
    let createdUser = await userModel.create(data);
    res.send({user : createdUser})
} catch (error) {
   res.status(500).send({errorMsg : error.message})
}
}
//=============================================================
const loginUser = async function(req,res){
 try {
       let emailId = req.body.email;
    let userPassword = req.body.password;
    if(!emailId) return res.status(400).send({status: false, error: "User ID missing"})
    if(!userPassword) return res.status(400).send({status: false, error: "Password missing"})
    const loggedInUser = await userModel.findOne({email : emailId,password : userPassword})
    if(!loggedInUser) return res.status(404).send({status:false,error:"Incorrect User ID or Password"})
    const token = await jwt.sign({userId : loggedInUser._id},"my secret string")
    res.setHeader("x-auth-token", token);
    res.send({status : true , token : token})
} catch (error) {
    res.status(500).send({errorMsg : error.message})
}
}
//=================================================================
const getUserData = async function(req,res){
   try {
    let userId = req.params.userId;
    const userData = await userModel.findById({_id : userId})
    let validUser = Object.keys(userData);
    if(validUser.length==0) res.status(404).send({error : "No data by this Id"})
    res.send({status : true,user : userData})
} catch (error) {
    res.status(500).send({errorMsg : error.message})
}
 }
//=================================================================
const updateUser = async function(req,res){
    try {
    let userId = req.params.userId;
    let data = req.body
    const userData = await userModel.findOneAndUpdate({_id : userId},data,{new:true})
    res.send({status : true,user : userData})
} catch (error) {
    res.status(500).send({errorMsg : error.message})
}
}
//=================================================================
const deleteUser = async function(req,res){
    try {
    let userId = req.params.userId;
    const userData = await userModel.findOneAndUpdate({_id : userId},{isDeleted:true},{new:true})
    res.send({status : true,user : userData})
} catch (error) {
    res.status(500).send({errorMsg : error.message})
}
}
//===================================================================



module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;