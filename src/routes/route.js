const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers')



 router.get('/assets',controller.coinDetails)



router.all("/*",function(req,res){
    res.status(400).send({status : false, msg:"invalid http request"})
})



// router.post('/abc',controller.createCoin)




module.exports = router