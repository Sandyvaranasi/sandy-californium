const express = require('express');
const controller = require('../controllers/userController.js');
const router = express.Router();
const midware=require('../middlewares/middleware')




router.post("/createAuthor", controller.createAuthor)

router.post("/login", controller.authorLogin)

router.post("/createblog",midware.authentication, controller.createblog)

router.get("/getBlog",midware.authentication, controller.getBlog)

router.put("/updateBlog/:blogId",midware.authentication ,controller.updateBlog)

router.delete("/deleteBlog/:blogId", midware.authentication, controller.deleteBlog)

router.delete("/deleteBlogs",midware.authentication, controller.deleteBlogs)






module.exports = router;