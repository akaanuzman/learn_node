const User = require("../models/user.model")
const asyncErrorHandler = require("express-async-handler")
const CustomError = require("../helpers/error/CustomError")

const getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find()
    return res.status(200)
        .json({
            success: true,
            users: users
        })
})

const getUserById = asyncErrorHandler(async (req, res, next) => {
    return res.status(200)
        .json({
            success: true,
            user: req.user
        })
})

const editProfile = asyncErrorHandler(async (req, res, next) => {
    const body = req.body
    const user = await User.findByIdAndUpdate(req.user.id, body,
        { new: true, runValidators: true })
    return res.status(200)
        .json({
            succes: true,
            updatedUser: user
        })
})

module.exports = { getAllUsers, getUserById, editProfile }