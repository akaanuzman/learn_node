
import User from "../models/user.model.js"
import asyncErrorHandler from "express-async-handler"

const getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find()
    return res.status(200)
        .json({
            success: true,
            users: users
        })
})

const getUserById = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById({ _id: req.params.id })
        .populate("question")
        .populate("answer")
    return res.status(200)
        .json({
            success: true,
            user: user
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

export { getAllUsers, getUserById, editProfile }