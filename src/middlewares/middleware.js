const jwt = require('jsonwebtoken')
const blogsModel = require('../models/blogsModel')

const authentication =async function(req,res,next)
{
    try{
        const token = req.headers['x-api-key']
        if(!token) return res.status(401).send({status:false,msg:"authentication is not completed"})
        const decodedToken =jwt.verify(token,"project1Group9",function(error,decodedToken){
            if(error) res.status(401).send({status:false,message:error.message})
            req.authorId=decodedToken.authorId
            next()
        })
        
    }
    catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
    
}

// const authorization =async function(req,res,next){
//     try{
//         const token =req.headers['x-api-key']
//         decodedToken=req.decodedToken
//         let blog = await blogsModel.findById(req.params.blogId)
//         if(!blog) return res.status(404).send({status:false, message:"no data found for this Id"})
//         if(decodedToken.authorId==blog.authorId) next()
//         return res.status().send({status:false,message:"you are not authorized to do this operation"})

//     }
//     catch(error){
//         return res.status(500).send({status:false,msg:error.message})
//     }
// }







module.exports.authentication=authentication
// module.exports.authorization=authorization