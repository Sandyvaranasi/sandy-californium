const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//===========================================================
const createUser = async function(req,res){
    let data = req.body;
    let createdUser = await userModel.create(data);
    res.send({user : createdUser})
}
//=============================================================
const loginUser = async function(req,res){
    let emailId = req.body.email;
    let userPassword = req.body.password;
    if(!emailId) return res.send({status: false, error: "User ID missing"})
    if(!userPassword) return res.send({status: false, error: "Password missing"})
    const loggedInUser = await userModel.findOne({email : emailId},{password : userPassword})
    if(!loggedInUser) return res.send({status:false,error:"Incorrect User ID or Password"})
    const token = await jwt.sign({userId : loggedInUser._id},"my secret string")
    res.setHeader("x-auth-token", token);
    res.send({status : true , token : token})
}
//=================================================================
const getUserData = async function(req,res){
    let userId = req.params.userId;
    const userData = await userModel.findById({_id : userId})
    res.send({status : true,user : userData})
 }
//=================================================================
const updateUser = async function(req,res){
    let userId = req.params.userId;
    let data = req.body
    const userData = await userModel.findOneAndUpdate({_id : userId},data,{new:true})
    res.send({status : true,user : userData})
}
//=================================================================
const deleteUser = async function(req,res){
    let userId = req.params.userId;
    const userData = await userModel.findOneAndUpdate({_id : userId},{isDeleted:true},{new:true})
    res.send({status : true,user : userData})
}
//===================================================================



module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
