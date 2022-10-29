import mongoose from "mongoose"
import Question from "../models/question.model.js"

const AnswerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [10, "Please provide a title at least 10 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    fav: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

AnswerSchema.pre("save", async function (next) {
    if (!this.isModified("user")) return next()

    try {
        const question = await Question.findById({ _id: this.question })
        question.answer.push(this._id)
        await question.save()
        next()
    } catch (err) {
        return next(err)
    }
})

const Answer = mongoose.model("Answer", AnswerSchema)

export default Answer