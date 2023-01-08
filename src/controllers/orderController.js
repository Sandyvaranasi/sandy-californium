const orderModel = require("../models/orderModel");
const mongoose = require('mongoose')
const orderLineItemModel = require('../models/orderLIneItem')

//=============================================CREATE AUTHOR==================================================================================================
const createOrder = async function (req, res) {
    try {
        let data = req.body;
        if (!data.customerName) return res.status(400).send({ status: false, message: "customerName is necessary" });
        if (!data.customerFullAddress) return res.status(400).send({ status: false, message: "customerFullAddress is necessary" });
        if (!data.invoiceNumber) return res.status(400).send({ status: false, message: "invoiceNumber is necessary" });
        if(!data.orderLineItems) return res.status(400).send({ status: false, message: "orderLineItems is necessary" });
        if(!mongoose.isValidObjectId(data.orderLineItems)) return res.status(400).send({ status: false, message: "invalid orderLineItems" });
        let abc = await orderLineItemModel.findById(data.orderLineItems)
        if(!abc) return res.status(404).send({ status: false, message: "no orderLineItems found" });
        let createdOrder = await orderModel.create(data);
        res.status(201).send({ status: "GENERATED", data: createdOrder })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
//====================================================CREATE ORDERLINEITEMS===============================
const orderLineItem = async function (req, res) {
    try {
        let data = req.body;
        if (!data.productName) return res.status(400).send({ status: false, message: "productName is necessary" });
        if (!data.quantity) return res.status(400).send({ status: false, message: "quantity is necessary" });
        if (!data.sellPrice) return res.status(400).send({ status: false, message: "sellPrice is necessary" });
        let orderLineItems = await orderLineItemModel.create(data);
        res.status(201).send({ status: true, data: orderLineItems })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

// //======================================================GET GRN====================================================================
const getOrder = async function (req, res) {
    try {
        let data = req.query;
        data.isDeleted = false;
        data.status = "GENERATED"
        let order = await orderModel.find(data)
        if (order.length == 0) return res.status(404).send({ msg: "No data found" });
        res.status(200).send({ status: true, data: order });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}
// //==============================================UPDATE GRN================================================================================
const updateOrder = async function (req, res) {
    try {
        let data = req.body;
        let orderId = req.params.orderId
        if(!mongoose.isValidObjectId(orderId)) return res.status(400).send({ message: "Invalid Id" });
        let x = await grnModel.findOne({_id:orderId,isDeleted:false})
        if(!x) return res.status(400).send({ message: "GRN not present" });
        if(Object.keys(data).length==0) return res.status(400).send({ message: "Insufficient input" });
        if(data.status){
            if(!["COMPLETED","CANCELLED"].includes(data.status)) return res.status(400).send({ message: "Invalid input" });
        }
        if(data.orderLineItems){
            let b = x.orderLineItems
            if(typeof(data.orderLineItems)=="string"){
                let a = data.orderLineItems.split(",")
               let c =  [...b,...a]
               data.orderLineItems = c
            }
            data.orderLineItems = [...b,...data.orderLineItems]
        }
        let updatedOrder = await grnModel.findByIdAndUpdate({orderId},{data},{new:true})
        return res.status(200).send({ status:true, message : updatedOrder });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
// //================================================DELETE GRN BY ID=============================================================================
const deleteOrder = async function (req, res) {
    try {
        let orderId = req.params.orderId
        if(!mongoose.isValidObjectId(orderId)) return res.status(400).send({ message: "Invalid Id" });
        let deletedOrder = await blogModel.findById(orderId)
        if (!deletedOrder) return res.status(404).send({ status: false, error: "No Data with this Id" })
        if (deletedOrder.isDeleted == true) return res.status(404).send({ status: false, error: "order doesn't exist" });
        await orderModel.findOneAndUpdate({ _id: orderId }, {isDeleted: true,}, { new: true });
        res.status(200).send("Sucessfully deleted")
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



module.exports.createOrder = createOrder;
module.exports.orderLineItem = orderLineItem;
module.exports.getOrder = getOrder;
module.exports.updateOrder = updateOrder;
module.exports.deleteOrder = deleteOrder;