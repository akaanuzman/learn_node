const Question = require("../models/question.model")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorHandler = require("express-async-handler")

const addQuestion = asyncErrorHandler(async (req, res, next) => {
    const params  = req.body
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

const onDelete = (req, res, next) => {
    res.json(
        {
            success: true,
            message: "Questions were deleted!"
        }
    )
}

const onUpdate = (req, res, next) => {
    res.json(
        {
            success: true,
            message: "Question was updated!"
        }
    )
}

module.exports = { addQuestion, onDelete, onUpdate }