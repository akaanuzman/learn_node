import asyncErrorHandler from "express-async-handler"
import User from "../models/user.model.js"

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

    user.isActive = false
    await user.save()
    return res.status(200)
        .json({
            success: true,
            message: "The user is deleted.",
        })
})

export { blockUser, deleteUser }