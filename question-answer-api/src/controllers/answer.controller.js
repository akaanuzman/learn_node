const Answer = require("../models/answer.model")
const Question = require("../models/question.model")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorHandler = require("express-async-handler")

const getAllAnswers = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    const question = await Question.findById({ _id: id })
        .populate("answer")
    const answer = question.answer
    res.status(200).json({
        success: true,
        answers: answer
    })
})

const getAnswerById = asyncErrorHandler(async (req, res, next) => {
    const answer = req.answer

    res.status(200).json({
        success: true,
        answer: answer
    })
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

module.exports = { getAllAnswers, getAnswerById, addNewAnswerToQuestion }
