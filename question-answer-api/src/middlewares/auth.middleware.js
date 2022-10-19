const CustomError = require("../helpers/error/CustomError")
const jwt = require("jsonwebtoken")
const { isTokenIncluded, getAccessTokenFromHeader } = require("../helpers/auth/auth.helper")
const asyncErrorHandler = require("express-async-handler")
const User = require("../models/user.model")

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
        req.user = {
            id: decoded.id,
            name: decoded.name
        }
        next()
    })
}

const getAdminAccess = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.user
    const user = await User.findById({ _id: id })

    if (user.role != "admin") {
        return next(new CustomError("Only admins can access this route", 403))
    }
    next()
})

module.exports = { getAccessToRoute, getAdminAccess }