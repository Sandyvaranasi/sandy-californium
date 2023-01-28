const userModel = require('../models/userModel.js');
const validation=require("../validations/validation");
const jwt = require('jsonwebtoken');
const moment = require('moment');

const createUser = async function(req,res){
try{
const userData = req.body

if(!userData.title) return res.status(400).send({status:false,message:"tittle is mandetory"})
if(typeof(userData.title) !== 'string') return res.status(400).send({status:false, message:"wrong format of title"})
if(!(["Mr", "Mrs", "Miss"].includes(userData.title))) return res.status(400).send({status:false, message:"title can only contain Mr,Mrs, Miss"})

if(!userData.name) return res.status(400).send({status:false,message:"name is mandetory"})
if(typeof(userData.name) !== 'string') return res.status(400).send({status:false,message:"wrong format of name"})
if(!validation.validate(userData.name)) return res.status(400).send({status:false,message:"invalid name"})

if(!userData.phone) return res.status(400).send({status:false,message:"phone is mandetory"})
if(typeof(userData.phone) !== "string") return res.status(400).send({status:false,message:"wrong format of phone"})
if(!validation.validatePhone(userData.phone)) return res.status(400).send({status:false,message:"invalid phone number"})

if(!userData.email) return res.status(400).send({status:false,message:"email is mandetory"})
if(typeof(userData.email) !== "string") return res.status(400).send({status:false,message:"wrong format of email"})
if(!validation.validateEmail(userData.email)) return res.status(400).send({status:false,message:"invalid email address"})

if(!userData.password) return res.status(400).send({status:false,message:"password is mandetory"})
if(typeof(userData.password) !== "string") return res.status(400).send({status:false,message:"wrong format of password"})
if(!validation.validatePassword(userData.password)) return res.status(400).send({status:false,message:"length of password should be 8 to 15 characters"})

if(userData.address){
    if(typeof(userData.address) !== 'object') return res.status(400).send({status:false,message:"wrong address format"})
    if(userData.address.street){
        if(typeof(userData.address.street) != "string") return res.status(400).send({status:false,message:"wrong street format"})
    }
    if(userData.address.city){
        if(typeof(userData.address.city) != "string") return res.status(400).send({status:false,message:"wrong city format"})
        if(!validation.validate(userData.address.city)) return res.status(400).send({status:false,message:"city should be only in alphabets"})
    }
    if(userData.address.pincode){
        if(typeof(userData.address.pincode) != "string") return res.status(400).send({status:false,message:"wrong pincode format"})
        if(!userData.address.pincode.match(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/)) return res.status(400).send({status:false,message:'invalid pin-code'})
    }
}

const unique = await userModel.findOne({$or:[{email:userData.email},{phone:userData.phone}]})
if (unique) {
    if(unique.email == userData.email) return res.status(400).send({status:false,message:"email already in use"})
    if(unique.phone == userData.phone) return res.status(400).send({status:false,message:"phone already in use"})
}
const createdUser = await userModel.create(userData);

let {__v,...mainData} = createdUser._doc
res.status(201).send({status:true,message:"Success", data:mainData})

 }catch(error){
    res.status(500).send({status:false,message:error.message})
 }
}

const userLogin = async function(req,res){
    try{
        let {email,password} = req.body

        if(!email) return res.status(400).send({status:false,message:"email is mandetory"})
        if(typeof(email) !== "string") return res.status(400).send({status:false,message:"wrong format of email"})
        if(!validation.validateEmail(email)) return res.status(400).send({status:false,message:"invalid email address"})
        
        if(!password) return res.status(400).send({status:false,message:"password is mandetory"})
        if(typeof(password) !== "string") return res.status(400).send({status:false,message:"wrong format of password"})
        if(!validation.validatePassword(password)) return res.status(400).send({status:false,message:"length of password should be 8 to 15 characters"})

        if(Object.keys(req.body).length!=2) return res.status(400).send({status:false,message:"only email and password is required"})

        const user = await userModel.findOne({$and:[{email:email},{password:password}]})
        if(!user) return res.status(401).send({status:false,message:"wrong email or password"})

        let token = jwt.sign({userId:user._id},"very secret string",{expiresIn:"30m"})
        let decodedToken = jwt.decode(token)

        decodedToken.iat = new Date(decodedToken.iat*1000).toGMTString()
        decodedToken.exp = new Date(decodedToken.exp*1000).toGMTString()

        return res.status(200).send({status:true,message:"success",data:{token:token,...decodedToken}})

    }catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}


module.exports = {createUser,userLogin}