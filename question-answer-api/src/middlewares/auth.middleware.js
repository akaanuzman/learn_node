import jwt from "jsonwebtoken"
import asyncErrorHandler from "express-async-handler"
import CustomError from "../helpers/error/CustomError.js"
import User from "../models/user.model.js"
import Question from "../models/question.model.js"
import {
    isTokenIncluded,
    getAccessTokenFromHeader
} from "../helpers/auth/auth.helper.js"

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
            name: decoded.name,
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

const getQuestionOwnerAccess = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id
    const { id } = req.params
    const question = await Question.findById({ _id: id })

    if (question.user != userId) {
        return next(new CustomError("Only owner can handle this operation", 403))
    }
    req.question = question
    next()
})

export {
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwnerAccess
}