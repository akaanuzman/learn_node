const User = require("../models/user.model")
const asyncErrorHandler = require("express-async-handler")
const CustomError = require("../helpers/error/CustomError")

const blockUser = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById({ _id: id })

    user.isBlocked = !user.isBlocked
    await user.save()
    return res.status(200)
        .json({
            success: true,
            message: user.isBlocked ? "The user is blocked." : "The user is unblocked",
            user: user,
        })
})

const deleteUser = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById({ _id: id })

    user.isActive = true
    await user.save()
    return res.status(200)
        .json({
            success: true,
            message: "The user is deleted.",
        })
})

module.exports = { blockUser, deleteUser }