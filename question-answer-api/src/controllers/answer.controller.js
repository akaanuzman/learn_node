const Answer = require("../models/answer.model")
const Question = require("../models/question.model")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorHandler = require("express-async-handler")

const getAllQuestions = asyncErrorHandler(async (req, res, next) => {

})

const addNewAnswerToQuestion = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const params = req.body
    const answer = await Answer.create({
        ...params,
        user: req.user.id,
        question: id
    })

    res.status(200)
        .json({
            success: true,
            answer: answer
        })
})

module.exports = { getAllQuestions, addNewAnswerToQuestion }
