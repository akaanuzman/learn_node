import CustomError from "../helpers/error/CustomError.js"

const errorHandler = (err, req, res, next) => {
    let customError = err
    console.log(customError.name, customError.message)
    if (err.name == "SyntaxError") {
        customError = new CustomError("Unexpected Syntax", 400)
    }
    if (err.name == "ValidationError") {
        if (err.message.includes("content") && err.message.includes("a content")) {
            customError = new CustomError("Please provide a content.", 400)
        } else if (err.message.includes("content")) {
            customError = new CustomError("Please provide a title at least 10 characters.", 400)
        } else {
            customError = new CustomError(err.message, 400)
        }
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

export { errorHandler }