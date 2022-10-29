import Answer from "../models/answer.model.js"
import Question from "../models/question.model.js"
import CustomError from "../helpers/error/CustomError.js"
import asyncErrorHandler from "express-async-handler"

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

const updateAnswer = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.answerId
    const body = req.body
    const answer = await Answer.findByIdAndUpdate(
        { _id: id },
        { ...body },
        { new: true, runValidators: true }
    )

    res.status(200)
        .json({
            success: true,
            updatedAnswer: answer
        })
})

const deleteAnswer = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.answerId
    const answer = await Answer.findById({ _id: id })
    answer.isActive = false
    await answer.save()

    res.status(200)
        .json({
            success: true,
            message: "This answer is deleted"
        })
})

const favAnswer = asyncErrorHandler(async (req, res, next) => {
    const answer = req.answer
    if (answer.fav.includes(req.user.id)) {
        return next(new CustomError("You already fav this answer", 400))
    }
    answer.fav.push(req.user.id)
    await answer.save()
    return res.status(200)
        .json({
            success: true,
            answer: answer
        })
})

const unFavAnswer = asyncErrorHandler(async (req, res, next) => {
    const answer = req.answer
    if (!answer.fav.includes(req.user.id)) {
        return next(new CustomError("You already unfav this answer", 400))
    }
    answer.fav = answer.fav.filter(e => !answer.fav.includes(e))
    await answer.save()
    res.status(200)
        .json({
            success: true,
            answer: answer
        })
})

export {
    getAllAnswers, getAnswerById,
    addNewAnswerToQuestion, updateAnswer,
    deleteAnswer, favAnswer,
    unFavAnswer
}
