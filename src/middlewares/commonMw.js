const jwt = require("jsonwebtoken")

const authenticate =  function (req, res, next) {
    try {
        let token = req.headers["x-auth-token"];
        if (!token) return res.status(400).send({error: "Missing mendatory header" });
        let validToken =  jwt.verify(token, "my secret string");
        req.body.token = validToken;
        next();
    } catch (error) {
        res.status(500).send({ errorMsg: error.message })
    }
}

const authorise =  function (req, res, next) {
    try {
        let userId = req.params.userId;
        if (!userId) return res.status(400).send({error: "User Id Missing" })
        if (req.body.token.userId != userId) return res.status(404).send({error : "User not found"});
        next();
    } catch (error) {
        res.status(500).send({ errorMsg: error.message })
    }
}


module.exports.authenticate = authenticate;
module.exports.authorise = authorise;