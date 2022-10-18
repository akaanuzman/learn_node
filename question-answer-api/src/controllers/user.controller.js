const User = require("../models/user.model")
const asyncErrorHandler = require("express-async-handler")
const CustomError = require("../helpers/error/CustomError")

const getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find()
    return res.status(200).json({
        success: true,
        users: users
    })
})

const getUserById = asyncErrorHandler(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        user: req.user
    })
})

module.exports = { getAllUsers, getUserById }