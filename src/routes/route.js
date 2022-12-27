const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMW = require("../middleware/auth")
//=======================================================================

router.post("/create", userController.createUser)

router.post("/login", userController.loginUser)

router.get("/getUserData/:userId",commonMW.authenticate, commonMW.authorise, userController.getUserData)

router.put("/update/:userId",commonMW.authenticate, commonMW.authorise, userController.updateUser)

router.delete("/delete/:userId",commonMW.authenticate, commonMW.authorise, userController.deleteUser)
//===========================================================================
module.exports = router;