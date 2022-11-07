import asyncErrorHandler from "express-async-handler"
import User from "../../models/user.model.js"
import Question from "../../models/question.model.js"
import Answer from "../../models/answer.model.js"
import CustomError from "../../helpers/error/CustomError.js"

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
    const question = await Question.findById({ _id: id, })
    if (!question) {
        return next(new CustomError("There is no such question with that id"), 400)
    }
    req.question = question
    next()
})

const checkAnswerExist = asyncErrorHandler(async (req, res, next) => {
    const { answerId } = req.params
    const questionId = req.question._id
    const question = await Question.findOne(
        { _id: questionId, isActive: true }
    )
    if (question) {
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
    } else {
        return next(new CustomError("This question was deleted."))
    }

})

export { checkUserExist, checkQuesitonExist, checkAnswerExist }