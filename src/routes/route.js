const express = require('express');
const router = express.Router();
//==========================================================================
const UserController= require("../controllers/userController")

const commonMW = require ("../middlewares/commonMiddlewares")
//==========================================================================


router.get("/getDate", commonMW.mid1, UserController.printDate)

router.get("/getIp", commonMW.mid2, UserController.printIp)

router.get("/getRoute", commonMW.mid3, UserController.printRoute)

router.get("/getAll", commonMW.mid1, commonMW.mid2, commonMW.mid3, UserController.printAll)

router.get("/getAllGlobal", UserController.globalMid)

//==============================================================================
module.exports = router;