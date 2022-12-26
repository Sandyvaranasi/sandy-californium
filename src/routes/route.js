const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMW = require("../controllers/middleware/commonMW")
//=======================================================================

router.post("/create", userController.createUser)

router.post("/login", userController.loginUser)

router.get("/getUserData/:userId",commonMW.midToken, userController.getUserData)

router.put("/update/:userId",commonMW.midToken, userController.updateUser)

router.delete("/delete/:userId",commonMW.midToken, userController.deleteUser)
//===========================================================================
module.exports = router;