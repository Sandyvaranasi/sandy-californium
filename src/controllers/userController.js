const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogsModel");
const jwt=require('jsonwebtoken')
const middle =require('../middlewares/middleware')


const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        if(!data.fname) return res.status(400).send({status:false,msg:"first name mandatory to fill"})
        if(!data.lname) return res.status(400).send({status:false,msg:"last name mandatory to fill"})
        if(!data.title) return res.status(400).send({status:false,msg:"title mandatory to fill"})
        if(!data.email) return res.status(400).send({status:false,msg:"email mandatory to fill"})
        if(!data.password) return res.status(400).send({status:false,msg:"password mandatory to fill"})
        if(!(["Mr", "Mrs", "Miss"].includes(data.title))) return res.status(400).send({status:false, message:"you can use only Mr, Mrs, Miss"})
        
        let validEmail = /.+\@.+\..+/
        if(!data.email.match(validEmail)) return res.status(400).send({status:false, message:"invalid email"})

        let createdAuhor = await authorModel.create(data);
        res.status(201).send({ status: true, data: createdAuhor })
    } catch (error) {
        res.status(400).send({ status: false, msg : error.message })
    }
}

const createblog = async function (req, res) {
    try {
        let data = req.body;
        if(!data.title) return res.status(400).send({status:false,msg:"title mandatory to fill"})
        if(!data.body) return res.status(400).send({status:false,msg:"body mandatory to fill"})
        if(!data.authorId) return res.status(400).send({status:false,msg:"authorId mandatory to fill"})
        if(!data.category) return res.status(400).send({status:false,msg:"category mandatory to fill"})
        let validAuthor = await authorModel.findById(data.authorId)
        if (!validAuthor) return res.status(400).send({ status: false, msg: "invalid author Id" })
        let createdBlog = await blogModel.create(data);

        res.status(201).send({ status: true, data: createdBlog })
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

const getBlog = async function (req, res) {
    try {
        let data = req.query;
        data.isDeleted = false;
        data.isPublished = true;
        let blogs = await blogModel.find(data)
        if (blogs.length == 0) return res.status(404).send({ msg: "No data found" });
        res.status(200).send({ status: true, data: blogs });

    } catch (error) {
        res.status(400).send({ status: false, msg: error.message });
    }
}

const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let data = req.body;
        if(Object.keys(data).length==0) return res.staus(400).send({status:false, msg: "please provide updation details"})
        let x = await blogModel.findById(blogId) 
        if(!x) return res.status(404).send({status:false, msg: "no data found for this id"}) 
        if(req.authorId!=x.authorId) return res.status(403).sen({status:false, msg:"you are not auhorized to do that operation"})
        if(x.isPublished==false)
        {
            data.isPublished = true;
            data.publishedAt = Date.now();
        }
        if (data.tags) {
            let tagsArr = x.tags;
            tagsArr.push(data.tags)
            data.tags = tagsArr
        }
        if (data.subcategory) {
            let subcategoryArr = x.subcategory;
            subcategoryArr.push(data.subcategory)
            data.subcategory = subcategoryArr
        }
        let updatedBlog = await blogModel.findByIdAndUpdate(blogId, { $set: data }, { new: true })
        res.status(201).send({ status: true, data: updatedBlog })
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

const deleteBlog = async function (req, res) {
    try {
        let data = req.params.blogId;
        const blog= await blogModel.findById(data)
        if(req.authorId!=blog.authorId) return res.status(403).sen({status:false, msg:"you are not auhorized to do that operation"})
        if(blog.isDeleted==true) return res.status(400).send({status:false,msg:"blog already deleted"})
        let deletedBlog = await blogModel.findOneAndUpdate({ _id: data }, { isDeleted: true, deletedAt: Date.now() }, { new: true });
        res.status(201).send({ status: true, data: deletedBlog })
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

const deleteBlogs = async function (req, res) {
    try {
        let data = req.query;
        
        if(Object.keys(data)==0) return res.status(400).send({status:false, msg:"please mention , which blogs you want to delete"})
        data.authorId=req.authorId 
        let filter_data= await blogModel.find(data)
        if(filter_data.length==0) return res.status(403).send({status:false,msg:"you are not authorized person"})
       
        data.isDeleted=false
        let deletedBlog = await blogModel.updateMany( data, { isDeleted: true, deletedAt: Date.now(), isPublished:false}, { new: true });
        res.status(201).send({ status: true, data: deletedBlog })
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

const authorLogin = async function (req, res) {
    try {
        let userEmail = req.body.email;
        let userPassword = req.body.password;
        if(!userEmail) return res.status(400).send({ status: false, error : "UserId missing" });
        if(!userPassword) return res.status(400).send({ status: false, error : "password missing" });
        let authenticatedUser = await authorModel.findOne({email:userEmail,password:userPassword})
        if(!authenticatedUser) return res.status(400).send({status:false,msg:"login Credential wrong"})
        let token= jwt.sign({authorId:authenticatedUser._id},"project1Group9")
        res.set('x-api-key',token)
        return res.status(200).send({status:true, data: token})
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}




module.exports.createAuthor = createAuthor;
module.exports.createblog = createblog;
module.exports.getBlog = getBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogs = deleteBlogs;
module.exports.authorLogin=authorLogin