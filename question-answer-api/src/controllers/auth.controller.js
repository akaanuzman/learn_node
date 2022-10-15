const User = require("../models/user.model")

const register = async (req, res, next) => {
    const name = "Alperen"
    const lastname = "Akarslan"
    const email = "alperenakarslaan@gmail.com"
    const password = "123"

    try {
        const user = await User.create({
            name,
            lastname,
            email,
            password
        })
        res.json({
            success: true,
            body: user
        })
    } catch (err) {
        return next(err)
    }
}

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