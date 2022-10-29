
const login = (req, res, next) => {
    res.json({
        status: true,
        message: "login"
    })
}

const register = (req, res, next) => {
    res.json({
        status: true,
        message: "register"
    })
}

export { login, register }