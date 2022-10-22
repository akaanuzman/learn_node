const User = require("../../models/user.model")
const Question = require("../../models/question.model")
const Answer = require("../../models/answer.model")
const asyncErrorHandler = require("express-async-handler")
const CustomError = require("../../helpers/error/CustomError")

const checkUserExist = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById({ _id: id })
    if (!user) {
        return next(new CustomError("There is no such user with that id"), 400)
    }
    req.user = user
    next()
})

const checkQuesitonExist = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const question = await Question.findById({ _id: id })
    if (!question) {
        return next(new CustomError("There is no such question with that id"), 400)
    }
    req.question = question
    next()
})

const checkAnswerExist = asyncErrorHandler(async (req, res, next) => {
    const { answerId } = req.params
    const questionId = req.question._id
    console.log(questionId + "******" + answerId)
    const answer = await Answer.findOne({
        _id: answerId,
        question: questionId
    }).populate({
        path: "user",
        select: "id name lastname "
    })
        .populate({
            path: "question",
            select: "id title subtitle"
        })
    if (!answer) {
        return next(new CustomError("There is no such answer with that id"), 400)
    }
    req.answer = answer
    next()
})

module.exports = { checkUserExist, checkQuesitonExist, checkAnswerExist }