const grnModel = require("../models/grnModel");
grnLineItemModel = require("../models/grnLineItem")
const mongoose = require('mongoose')

//=============================================CREATE AUTHOR==================================================================================================
const createGrn = async function (req, res) {
    try {
        let data = req.body;
        if (!data.vendorName) return res.status(400).send({ status: false, message: "vendorName is necessary" });
        if (!data.vendorFullAddress) return res.status(400).send({ status: false, message: "vendorFullAddress is necessary" });
        if (!data.invoiceNumber) return res.status(400).send({ status: false, message: "invoiceNumber is necessary" });
        if(!data.grnLineItems) return res.status(400).send({ status: false, message: "grnLineItems is necessary" });
        if(!mongoose.isValidObjectId(data.grnLineItems)) return res.status(400).send({ status: false, message: "invalid grnLineItems" });
        let abc = await grnLineItemModel.findById(data.grnLineItems)
        if(!abc) return res.status(404).send({ status: false, message: "no grnLineItem found" });
        let createdGrn = await grnModel.create(data);
        res.status(201).send({ status: "GENERATED", data: createdGrn })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
//====================================CREATE GRNLINEITEMS============================================
const grnLineItem = async function (req, res) {
    try {
        let data = req.body;
        if (!data.productName) return res.status(400).send({ status: false, message: "productName is necessary" });
        if (!data.quantity) return res.status(400).send({ status: false, message: "quantity is necessary" });
        if (!data.stockPrice) return res.status(400).send({ status: false, message: "stockPrice is necessary" });
        let grnLineItems = await grnLineItemModel.create(data);
        res.status(201).send({ status: true, data: grnLineItems })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
// //======================================================GET GRN====================================================================
const getGrn = async function (req, res) {
    try {
        let data = req.query;
        data.isDeleted = false;
        data.status = "GENERATED"
        let grn = await grnModel.find(data)
        if (grn.length == 0) return res.status(404).send({ msg: "No data found" });
        res.status(200).send({ status: true, data: grn });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}
// //==============================================UPDATE GRN================================================================================
const updateGrn = async function (req, res) {
    try {
        let data = req.body;
        let grnId = req.params.grnId
        if(!mongoose.isValidObjectId(grnId)) return res.status(400).send({ message: "Invalid Id" });
        let x = await grnModel.findOne({_id:grnId,isDeleted:false})
        if(!x) return res.status(400).send({ message: "GRN not present" });
        if(Object.keys(data).length==0) return res.status(400).send({ message: "Insufficient input" });
        if(data.status){
            if(!["COMPLETED","CANCELLED"].includes(data.status)) return res.status(400).send({ message: "Invalid input" });
        }
        if(data.grnLineItems){
            let b = x.grnLineItems
            if(typeof(data.grnLineItems)=="string"){
                let a = data.grnLineItems.split(",")
               let c =  [...b,...a]
               data.grnLineItems = c
            }
            data.grnLineItems = [...b,...data.grnLineItems]
        }
        let updatedGrn = await grnModel.findByIdAndUpdate({grnId},{data},{new:true})
        return res.status(200).send({ status:true, message : updatedGrn });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
// //================================================DELETE GRN BY ID=============================================================================
const deleteGrn = async function (req, res) {
    try {
       let grnId = req.params.grnId
        if(!mongoose.isValidObjectId(grnId)) return res.status(400).send({ message: "Invalid Id" });
        let deletedGrn = await blogModel.findById(grnId)
        if (!deletedGrn) return res.status(404).send({ status: false, error: "No Data with this Id" })
        if (deletedGrn.isDeleted == true) return res.status(404).send({ status: false, error: "GRN doesn't exist" });
        await grnModel.findOneAndUpdate({ _id: grnId }, {isDeleted: true,}, { new: true });
        res.status(200).send("Sucessfully deleted")
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



module.exports.createGrn = createGrn;
module.exports.grnLineItem = grnLineItem;
module.exports.getGrn = getGrn;
module.exports.updateGrn = updateGrn;
module.exports.deleteGrn = deleteGrn;

