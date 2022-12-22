const address = require('address')
const moment = require('moment')
//===========================================================

const mid1= function ( req, res, next) {
    let currentDate = moment()
    console.log(currentDate)
    next()
}
//===========================================================
const mid2= function ( req, res, next) {
    let currentLocation = address.ip()
    console.log(currentLocation)
    next()
}
//===============================================================
const mid3= function ( req, res, next) {
    
    console.log(req.path)
    next()
}
//==============================================================
const mid= function ( req, res, next) {
    
    console.log(`This is date=> ${moment()}, This is IP=> ${address.ip()} and This is Route=> ${req.path}`)
    next()
}

module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3
module.exports.mid= mid


