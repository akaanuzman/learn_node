const User = require("../models/user.model")
const asyncErrorHandler = require("express-async-handler")

const register = asyncErrorHandler(async (req, res) => {

    const user = await User.create(req.body)
    const token = user.generateJwtFromUser()
    res.json({
        success: true,
        token: token,
        body: user,
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
    res.json(
        {
            message: "ERROR"
        }
    )
}

module.exports = { register, login, error }