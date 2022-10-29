import mongoose from "mongoose"
import slugify from "slugify"

const QuesitonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        minlength: [10, "Please provide a title at least 10 characters"],
        unique: true,
    },
    subtitle: {
        type: String,
        required: [true, "Please provide a subtitle"],
        minlength: [10, "Please provide a subtitle at least 10 characters"],
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    fav: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    answer: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Answer"
        }
    ],
})

QuesitonSchema.pre("save", function (next) {
    if (!this.isModified("title")) {
        next()
    }
    this.slug = this.createSlugify()
    next()
})

QuesitonSchema.methods.createSlugify = function () {
    return slugify(this.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        trim: true,
    })
}

const Question = mongoose.model("Question", QuesitonSchema)
export default Question