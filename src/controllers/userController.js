
const printDate= async function(req, res) {

    res.send({ msg: "This is coming from controller (currentDate)"})

    }

const printIp= async function(req, res) {

    res.send({ msg: "This is coming from controller (currentIP)"})
    
    }

const printRoute= async function(req, res) {

    res.send({ msg: "This is coming from controller (currentRoute)"})
        
    }

const printAll= async function(req, res) {

    res.send({ msg: "This is coming from controller (allTogather)"})
            
    }

    const globalMid= async function(req, res) {

        res.send({ msg: "This is coming from controller (allTogather by Global Middleware)"})
                
        }


module.exports.printDate= printDate
module.exports.printIp= printIp
module.exports.printRoute= printRoute
module.exports.printAll= printAll
module.exports.globalMid= globalMid