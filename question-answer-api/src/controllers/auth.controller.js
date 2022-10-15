const User = require("../models/user.model")
const asyncErrorHandler = require("express-async-handler")

const register = asyncErrorHandler(async (req, res) => {

    const user = await User.create(req.body)
    res.json({
        success: true,
        body: user
    })
})

const login = (req, res, next) => {
    res.json(
        {
            message: "Login Page"
        }
    )
}

const error = (req, res, next) => {
    throw new Error("This is a error")
}

module.exports = { register, login, error }