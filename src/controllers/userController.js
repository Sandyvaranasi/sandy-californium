const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogsModel");


const createAuthor = async function (req, res) {
    try {
         let data = req.body;
        // if(!(["Mr", "Mrs", "Miss"].includes(data.title))) return res.status(400).send({status:false, message:"you can use only Mr, Mrs, Miss"})

        // let validEmail = ([/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/])
        // if(!data.email.match(validEmail)) return res.status(400).send({status:false, message:"invalid email"})

        let createdAuhor = await authorModel.create(data);
        res.status(201).send({ status: true, data: createdAuhor })
    } catch (error) {
        res.status(400).send({ status: false, msg : error.message })
    }
}

const createblog = async function (req, res) {
    try {
        let data = req.body;
        let validAuthor = await authorModel.findById(data.authorId)
        if (!validAuthor) return res.status(400).send({ status: false, msg: "invalid author Id" })
        let createdBlog = await blogModel.create(data);
        if(createdBlog.isDeleted == true){
            await blogModel.findOneAndUpdate({_id:createdBlog._id},{deletedAt : Date.now()},{upsert : true})
        }
        if(createdBlog.isPublished == true){
            await blogModel.findOneAndUpdate({_id:createdBlog._id},{publishedAt : Date.now()},{upsert : true})
        }
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
        let x = await blogModel.findById(blogId) //edge case 
        data.isPublished = true;
        data.publishedAt = Date.now();
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
        let deletedBlog = await blogModel.findOneAndUpdate({ _id: data }, { isDeleted: true, deletedAt: Date.now() }, { new: true });
        res.status(201).send({ status: true, data: deletedBlog })
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

const deleteBlogs = async function (req, res) {
    try {
        let data = req.query;
        let deletedBlog = await blogModel.updateMany( data, { isDeleted: true, deletedAt: Date.now() }, { new: true });
        res.status(201).send({ status: true, data: deletedBlog })
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

// const authorLogin = async function (req, res) {
//     try {
//         let email = req.body.email;
//         let password = req.body.password;
//         if(!email) return res.status(400).send({ status: false, error : "UserId missing" });
//         if(!password) return res.status(400).send({ status: false, error : "password missing" });
//         let validUser = await
//         let deletedBlog = await blogModel.updateMany( data, { isDeleted: true, deletedAt: Date.now() }, { new: true });
//         res.status(201).send({ status: true, data: deletedBlog })
//     } catch (error) {
//         res.status(400).send({ status: false, msg: error.message })
//     }
// }




module.exports.createAuthor = createAuthor;
module.exports.createblog = createblog;
module.exports.getBlog = getBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogs = deleteBlogs;