const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
//=======================================================================

router.post("/create", userController.createUser)

router.post("/login", userController.createMeme)

router.get("/getUserData/:memeId", userController.getUserData)

// //===========================================================================
module.exports = router;