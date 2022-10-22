const Question = require("../models/question.model")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorHandler = require("express-async-handler")

const getAllQuestions = asyncErrorHandler(async (req, res, next) => {
    const quesitons = await Question.find()
        .populate(
            {
                path: "user",
                select: "id name lastname"
            }
        ).populate(
            {
                path: "answer",
            }
        )

    return res.status(200)
        .json({
            success: true,
            quesitons: quesitons
        })
})

const getQuestion = asyncErrorHandler(async (req, res, next) => {
    return res.status(200)
        .json({
            success: true,
            question: req.question
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

const updateQuestion = asyncErrorHandler(async (req, res, next) => {
    const params = req.body
    const question = req.question
    let updatedQuestion = await Question.findByIdAndUpdate(question.id, {
        ...params
    }, { new: true, runValidators: true }).populate(
        {
            path: "user",
            select: "id name lastname"
        }
    ).populate(
        {
            path: "answer",
        }
    )

    updatedQuestion = await updatedQuestion.save()

    return res.status(200)
        .json({
            success: true,
            question: updatedQuestion,
        })
})

const deleteQuestion = asyncErrorHandler(async (req, res, next) => {
    const question = req.question
    question.isActive = false

    await question.save()

    return res.status(200)
        .json({
            success: true,
            deletedQuestion: question
        })
})

const favQuestion = asyncErrorHandler(async (req, res, next) => {
    const question = req.question
    if (question.fav.includes(req.user.id)) {
        return next(new CustomError("You already fav this question", 400))
    }
    question.fav.push(req.user.id)
    await question.save()
    return res.status(200)
        .json({
            success: true,
            question: question
        })
})

const unFavQuestion = asyncErrorHandler(async (req, res, next) => {
    let question = req.question
    if (!question.fav.includes(req.user.id)) {
        return next(new CustomError("You already unfav this question", 400))
    }
    question.fav = question.fav.filter(e => !question.fav.includes(e))
    await question.save()
    return res.status(200)
        .json({
            success: true,
            question: question
        })
})

module.exports = {
    getAllQuestions, getQuestion,
    addQuestion, updateQuestion,
    deleteQuestion, favQuestion,
    unFavQuestion
}