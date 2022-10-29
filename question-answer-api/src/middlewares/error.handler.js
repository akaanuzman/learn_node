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
        if (err.message.includes("email")) {
            const message = "Your email address is used.\nPlease try again with enter other email."
            customError = new CustomError(message, 400)

        } else if (err.message.includes("title")) {
            const message = "This title is used.\nPlease try again with enter other title."
            customError = new CustomError(message, 400)
        } else {
            customError = new CustomError("Duplicate Key Error", 400)
        }
    }

    res.status(customError.status || 500).json(
        {
            succes: false,
            message: customError.message || "Internal Server Error"
        }
    )
}

module.exports = { errorHandler }