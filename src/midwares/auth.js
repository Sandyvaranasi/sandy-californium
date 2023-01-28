const jwt = require('jsonwebtoken');

const authenticate = function (req, res, next) {
    try {
        let token = req.headers.key

        if (!token) return res.status(400).send({ status: false, message: "missing mandatory header" })

        jwt.verify(token, "very secret string", function (err, decodedToken) {
            if (err) return res.status(401).send({ status: false, message: err.message })
            if (decodedToken) {
                req.userId = decodedToken.userId
                next()
            } else {
                return res.status(401).send({ status: false, message: "Token is invalid" })
            }
        })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.authenticate = authenticate