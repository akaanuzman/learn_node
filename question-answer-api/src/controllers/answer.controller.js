import Answer from "../models/answer.model.js"
import User from "../models/user.model.js"
import CustomError from "../helpers/error/CustomError.js"
import asyncErrorHandler from "express-async-handler"
import Question from "../models/question.model.js"

const getAllAnswers = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    const question = await Question.findOne({ _id: id, isActive: true })

    if (question) {
        const answer = await Answer.find({ question: id, isActive: true })
            .populate("user").populate("fav").populate("question")

        answer.sort((a, b) => b.createdAt - a.createdAt)
        res.status(200).json({
            success: true,
            answers: answer
        })
    } else {
        return next(new CustomError("This question was deleted."))
    }
})

const getAnswerById = asyncErrorHandler(async (req, res, next) => {
    const { answerId } = req.params
    const answer = await Answer.findOne({ _id: answerId, isActive: true })

    if (answer) {
        res.status(200).json({
            success: true,
            answer: answer
        })
    } else {
        return next(new CustomError("This answer was deleted."))
    }

})

const addNewAnswerToQuestion = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const params = req.body
    const answer = await Answer.create({
        ...params,
        user: req.user.id,
        question: id
    })

    const user = await User.findById({ _id: req.user.id })
    user.answer.push(answer)

    await user.save()

    res.status(200)
        .json({
            success: true,
            message: "You added answer in successful!",
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
