const CustomError = require("../error/CustomError")
const bcrypt = require("bcryptjs")

const validateUserInput = (email, pass, next) => {
    if (!email) {
        return next(new CustomError("Please enter email"), 400)
    } else if (!pass) {
        return next(new CustomError("Please enter password"), 400)
    } else if (!email && !pass) {
        return next(new CustomError("Please enter email and password"), 400)
    }
}

const comparePassword = (pass, hashPass) => {
    return bcrypt.compareSync(pass, hashPass)
}

module.exports = { validateUserInput, comparePassword }