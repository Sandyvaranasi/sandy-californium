const isHeaderChecker = function(req, res, next) {
    if(req.headers["isfreeappuser"]){
        req.body.isFreeAppUser = req.headers["isfreeappuser"]
       next()
    }else{
        res.send("The request is missing a mandatory header") 
    }
}
//=======================================================================




module.exports.isHeaderChecker = isHeaderChecker 