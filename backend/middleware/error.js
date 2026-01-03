import HandleError from "../utils/handleError.js";

export default (err, req, res, next) => {
    console.log("ERROR LOG:", err); // Debugging
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
    // castError
    if (err.name === 'CastError') {
        const message = `This is invalid resources ${err.path}`;
        err = new HandleError(message, 404)
    }
    // duplicate key errror
    if (err.code === 11000) {
        const message = `This ${Object.keys(err.keyValue)} already register. Plese login to continue`;
        err = new HandleError(message, 404);
    }
    // JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, try again";
        err = new HandleError(message, 400);
    }

    // JWT Expire error
    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token is expired, try again";
        err = new HandleError(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
