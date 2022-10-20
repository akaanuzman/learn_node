const Question = require("../models/question.model")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorHandler = require("express-async-handler")

const getAllQuestions = asyncErrorHandler(async (req, res, next) => {
    const quesitons = await Question.find()
    return res.status(200)
        .json({
            success: true,
            quesitons: quesitons
        })
})

const addQuestion = asyncErrorHandler(async (req, res, next) => {
    const params = req.body
    const question = await Question.create({
        ...params,
        user: req.user.id,
    })
    res.status(200)
        .json({
            success: true,
            question: question,
        })
})


module.exports = { getAllQuestions, addQuestion }