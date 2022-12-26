const jwt = require("jsonwebtoken")

const midToken = async function(req,res,next){
    let userId = req.params.userId;
    let data = req.body
    let token = req.headers["x-auth-token"]
    if(!token) return res.send({status:false,error: "missing mendatory header"})
    let validToken = await jwt.verify(token,"my secret string")
    if(validToken.userId != userId) return res.send({status: false, error : "Invalid User"})
    next()
}
module.exports.midToken = midToken