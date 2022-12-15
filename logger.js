function log(req,res,next){
    console.log("hello... world")
    next()
 
 }

module.exports= log;