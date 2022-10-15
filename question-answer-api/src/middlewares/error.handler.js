const CustomError = require("../helpers/error/CustomError")

const errorHandler = (err, req, res, next) => {
    let customError = err
    console.log(customError.name, customError.message)
    if (err.name == "SyntaxError") {
        customError = new CustomError("Unexpected Syntax", 400)
    }
    if (err.name == "ValidationError") {
        customError = new CustomError(err.message, 400)
    }
    if (err.code == 11000) {
        // Duplicate Key error
        customError = new CustomError("Duplicate Key Error",400)
    }

    res.status(customError.status || 500).json(
        {
            succes: false,
            message: customError.message || "Internal Server Error"
        }
    )
}

module.exports = { errorHandler }