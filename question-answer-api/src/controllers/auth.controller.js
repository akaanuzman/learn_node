import asyncErrorHandler from "express-async-handler"
import User from "../models/user.model.js";
import CustomError from "../helpers/error/CustomError.js"
import { validateUserInput, comparePassword } from "../helpers/input/input.helper.js";
import sendMail from "../helpers/libraries/sendEmail.js";

const register = asyncErrorHandler(async (req, res) => {
    const user = await User.create(req.body)
    if (!user) {
        return next(new CustomError(err.message, 400))
    }
    const token = user.generateJwtFromUser()
    res.json({
        success: true,
        message: "You registered in successful",
        token: token,
        body: user,
    })
})

const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    validateUserInput(email, password, next)
    const user = await User.findOne({ email })
        .select("+password")
        .populate("question")
        .populate("answer")
    if (!user) {
        return next(new CustomError(
            "Invalid email.\nPlease check email and try again.", 400)
        )
    }
    if (!comparePassword(password, user.password)) {
        return next(new CustomError(
            "Invalid password.\nPlease check password and try again.", 400)
        )
    }
    user.token = user.generateJwtFromUser()
    await user.save()
    res.json({
        success: true,
        message: "You logged in successful.",
        token: user.token,
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

const forgotPassword = asyncErrorHandler(async (req, res, next) => {

    const resetEmail = req.body.email
    const user = await User.findOne({ email: resetEmail })
    if (!user) {
        return next(new CustomError("There is no user with that email", 400))
    }
    const token = Math.floor(100000 + Math.random() * 900000)
    const emailTemplate = `
    <h3> Reset Your Password </h3>
    <p> This is your reset password token : ${token}. </p>
    `

    try {
        await sendMail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset ur password.",
            html: emailTemplate
        })
        user.resetPasswordToken = token
        await user.save()
        res.status(200).json(
            {
                success: true,
                message: "Password reset successful. A 6-digit password reset token has been sent to your email.",
                token: token
            }
        )
    } catch (err) {
        user.resetPasswordToken = undefined
        await user.save()
        return next(new CustomError("Email could not be sent", 500))
    }

})

const resetPassword = asyncErrorHandler(async (req, res, next) => {

    const { resetPasswordToken } = req.query
    const { password } = req.body

    if (!resetPasswordToken) {
        return next(new CustomError("Please provide a valid token", 400))
    }
    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
    })
    if (!user) {
        return next(new CustomError("Please provide a valid token", 400))
    } else {
        user.password = password
        await user.save()

        return res.status(200).json(
            {
                success: true,
                message: "Reset password process successful!",
                user: user
            }
        )
    }


})

const imageUpload = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user.id, {
        "img": req.savedProfileImage
    }, { new: true, runValidators: true })

    res.status(200).json({
        success: true,
        message: "Image Upload Successful",
        user: user
    })
})

export {
    register, login,
    tokenControl, forgotPassword,
    resetPassword, imageUpload
}