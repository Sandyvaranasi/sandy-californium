
const userModel = require("../models/userModel");
const memeModel = require("../models/memeModel")

//===========================================================
const createUser = async function (req, res) {
    try {
        let data = req.body;
        let validData = Object.keys(data);
        if (validData.length == 0) res.status(400).send({ error: "Data is not provided" })
        let createdUser = await userModel.create(data);
        res.send({ user: createdUser })
    } catch (error) {
        res.status(500).send({ errorMsg: error.message })
    }
}
//===================================================================================================
const createMeme = async function (req, res) {
    try {
        // let emailId = req.body.email;
        // let userPassword = req.body.password;
        // if (!emailId) return res.status(400).send({ status: false, error: "User ID missing" })
        // if (!userPassword) return res.status(400).send({ status: false, error: "Password missing" })
        // const loggedInUser = await userModel.findOne({ email: emailId, password: userPassword })
        // if (!loggedInUser) return res.status(404).send({ status: false, error: "Incorrect User ID or Password" })
        let data = req.body;
        let validData = Object.keys(data);
        if (validData.length == 0) res.status(400).send({ error: "Data is not provided" })
        let createdMeme = await memeModel.create(data);
        res.send({ user: createdMeme })
    } catch (error) {
        res.status(500).send({ errorMsg: error.message })
    }
}
//==================================================================================================================
const getUserData = async function (req, res) {
    try {
        let memeID = req.params.memeId;
        const userData = await memeModel.findOne({ memeId: memeID }).select({memes:1,_id:0})
        let validUser = Object.keys(userData);
        if (validUser.length == 0) res.status(404).send({ error: "No data available" })
        res.status(200).send(userData)
    } catch (error) {
        res.status(500).send({ errorMsg: error.message })
    }
}
//=========================================================================================================


module.exports.createUser = createUser;
module.exports.createMeme = createMeme;
module.exports.getUserData = getUserData;