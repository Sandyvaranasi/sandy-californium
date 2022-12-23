const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMW = require ("../middlewares/commonMiddlewares")



router.post("/createOrder", commonMW.isHeaderChecker, userController.createOrder)

router.post("/createProduct", userController.createProduct)

router.post("/createUser", commonMW.isHeaderChecker, userController.createUser)




module.exports = router;