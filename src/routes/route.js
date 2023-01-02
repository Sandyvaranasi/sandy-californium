const express = require('express');
const controller = require('../controllers/userController.js');
const router = express.Router();




router.post("/createAuthor", controller.createAuthor)

router.post("/createblog", controller.createblog)

router.get("/getBlog", controller.getBlog)

router.put("/updateBlog/:blogId", controller.updateBlog)

router.delete("/deleteBlog/:blogId", controller.deleteBlog)

router.delete("/deleteBlogs", controller.deleteBlogs)




module.exports = router;