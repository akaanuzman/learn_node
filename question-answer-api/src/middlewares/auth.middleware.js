const CustomError = require("../helpers/error/CustomError")
const jwt = require("jsonwebtoken")
const { isTokenIncluded, getAccessTokenFromHeader } = require("../helpers/auth/auth.helper")

const getAccessToRoute = (req, res, next) => {
    const unAuthorizedError = new CustomError("No token provided", 401)
    const { JWT_SECRET_KEY } = process.env
    if (!isTokenIncluded(req)) {
        return next(unAuthorizedError)
    }
    const token = getAccessTokenFromHeader(req)


    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(unAuthorizedError)
        }
        next()
    })
}

module.exports = { getAccessToRoute }