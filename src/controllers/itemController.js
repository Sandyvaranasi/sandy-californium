const itemModel = require("../models/Item");
const mongoose = require('mongoose')


//=========================================CREATE ITEM==============================================
const createItem = async function (req, res) {
    try {
        let data = req.body;
        if (!data.productName) return res.status(400).send({ status: false, message: "productName is necessary" });
        if (!data.quantity) return res.status(400).send({ status: false, message: "quantity is necessary" });
        if (!data.sellPrice) return res.status(400).send({ status: false, message: "sellPrice is necessary" });
        if(!data.stockPrice) return res.status(400).send({ status: false, message: "stockPrice is necessary" });
        let createdItem = await itemModel.create(data);
        res.status(201).send({ status: true, data: createdItem })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
//===========================================GET ITEM================================================
const getItem = async function (req, res) {
    try {
        let data = req.query;
        if(data._id){
            if(!mongoose.isValidObjectId(data._id)) return res.status(400).send({eror:"Invalid Id"})
        }
        data.isDeleted = false;
        let items = await itemModel.find(data)
        if (items.length == 0) return res.status(404).send({ msg: "No data found" });
        res.status(200).send({ status: true, data: items});

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.getItem = getItem;
module.exports.createItem = createItem;