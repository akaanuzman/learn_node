const register = (req, res, next) => {
    res.json(
        {
            message: "Register Page"
        }
    )
}

const login = (req, res, next) => {
    res.json(
        {
            message: "Login Page"
        }
    )
}

module.exports = { register, login }