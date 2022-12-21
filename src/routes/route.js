const express = require('express');
const router = express.Router();

const bookController = require("../controllers/bookController");


//============================================================================
router.post("/createAuthor", bookController.createAuthor);
//============================================================================
router.post("/createPublisher", bookController.createPublisher);
//============================================================================
router.post("/createBook", bookController.createBook);
//=============================================================================
router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails);
//============================================================================
router.put("/updateCover", bookController.updateCover);
//============================================================================
router.put("/getAuthor", bookController.getAuthor);
//============================================================================
module.exports = router;