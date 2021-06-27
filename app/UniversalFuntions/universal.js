

exports.tryCatch = async ( req,res,code ) =>{
    try {
        code
    } catch (err) {
        res.status(401).send(err);
        return console.log("ERROR", err);
    }
}