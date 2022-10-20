const User = require("../../models/user.model")
const Question = require("../../models/question.model")
const asyncErrorHandler = require("express-async-handler")
const CustomError = require("../../helpers/error/CustomError")

const checkUserExist = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById({ _id: id })
    if (!user) {
        return next(new CustomError("There is no such user with that id"))
    }
    req.user = user
    next()
})

const checkQuesitonExist = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const question = await Question.findById({ _id: id })
    if (!question) {
        return next(new CustomError("There is no such question with that id"))
    }
    req.question = question
    next()
})

module.exports = { checkUserExist, checkQuesitonExist }