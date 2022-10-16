const User = require("../models/user.model")
const asyncErrorHandler = require("express-async-handler")
const { validateUserInput, comparePassword } = require("../helpers/input/input.helper")
const CustomError = require("../helpers/error/CustomError")

const register = asyncErrorHandler(async (req, res) => {

    const user = await User.create(req.body)
    const token = user.generateJwtFromUser()
    res.json({
        success: true,
        token: token,
        body: user,
    })
})

const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    validateUserInput(email, password, next)
    const user = await User.findOne({ email }).select("+password")
    if (!comparePassword(password, user.password)) {
        return next(new CustomError("Invalid password.", 400))
    }
    const token = user.generateJwtFromUser()
    res.json({
        success: true,
        token: token,
        body: user
    })
})

const tokenControl = (req, res, next) => {
    res.json(
        {
            success: true
        }
    )
}

const imageUpload = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user.id, {
        "img": req.savedProfileImage
    }, { new: true, runValidators: true})

    res.status(200).json({
        success: true,
        message: "Image Upload Successful",
        user: user
    })
})

module.exports = { register, login, tokenControl, imageUpload }