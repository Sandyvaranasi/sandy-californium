const express = require('express');
const router = express.Router();
const bookController= require("../controllers/bookController")



router.post("/createBook", bookController.createBook  )

router.post("/createAuthor", bookController.createAuthor)

router.post("/getBookById", bookController.getBookById)

router.post("/getAuthorName", bookController.getAuthorName)

router.get("/bookBtwn", bookController.bookBtwn)


module.exports = router;