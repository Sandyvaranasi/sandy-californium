const jwt = require("jsonwebtoken")

const authenticate = async function(req,res,next){
    let token = req.headers["x-auth-token"];
    if(!token) return res.send({status:false,error: "missing mendatory header"});
  await jwt.verify(token,"my secret string");
    next();
}

const authorise = async function(req,res,next){
    let userId = req.params.userId;
    let token = req.headers["x-auth-token"];
    let validToken = await jwt.verify(token,"my secret string");
    if(validToken.userId != userId) return res.send({status: false, error : "Invalid User"});
    next();
}


module.exports.authenticate = authenticate;
module.exports.authorise = authorise;