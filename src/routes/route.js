const express = require('express');
const controller = require('../controllers/userController.js');
const router = express.Router();
const midware = require("../middlewares/commonMidleware")




router.post("/authors", controller.createAuthor)

router.post("/login", controller.authorLogin)

router.post("/blogs",midware.auth, controller.createblog)

router.get("/blogs",midware.auth, controller.getBlog)

router.put("/blogs/:blogId",midware.auth, controller.updateBlog)

router.delete("/blogs/:blogId",midware.auth, controller.deleteBlog)

router.delete("/blogs",midware.auth, controller.deleteBlogs)

 


module.exports = router;