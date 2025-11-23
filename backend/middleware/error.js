import HandleError from "../utils/handleError.js";

export default(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal server error";
// castError
if(err.name==='CastError'){
    const message = `This is invalid resources ${err.path}`;
    err=new HandleError(message,404)
}
// duplicate key errror
if(err.code===11000){
    const message=`This ${Object.keys(err.keyValue)} already register. Plese login to continue`;
    err=new HandleError(message,404);
}
    res.status(err.statusCode).json({
        sucess:false,
        message:err.message
        // message:err.stack----for checking castError
    })
}