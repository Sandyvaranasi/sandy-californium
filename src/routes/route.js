const express = require('express');
const grncontroller = require('../controllers/grnController');
const itemcontroller = require('../controllers/itemController');
const ordercontroller = require('../controllers/orderController');
const router = express.Router();




router.post("/createGrn", grncontroller.createGrn)
router.post("/grnLineItem", grncontroller.grnLineItem)
router.get("/getGrn", grncontroller.getGrn)
router.put("/updateGrn", grncontroller.updateGrn)
router.delete("/deleteGrn", grncontroller.deleteGrn)


router.post("/createOrder", ordercontroller.createOrder)
router.post("/orderLineItem", ordercontroller.orderLineItem)
router.get("/getOrder", ordercontroller.getOrder)
router.put("/updateOrder", ordercontroller.updateOrder)
router.delete("/deleteOrder", ordercontroller.deleteOrder)


router.post("/createItem", itemcontroller.createItem)
router.post("/getItem", itemcontroller.getItem)

 


module.exports = router;