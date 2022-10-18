const User = require("../../models/user.model")
const asyncErrorHandler = require("express-async-handler")
const CustomError = require("../../helpers/error/CustomError")

const checkUserExist = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById({ _id: id })
    if (!user) {
        return next(new CustomError("There is no such user with that id"))
    }
    req.user = user
    next()
})

module.exports = { checkUserExist }