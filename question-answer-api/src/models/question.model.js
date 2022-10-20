const mongoose = require("mongoose")
const slugify = require("slugify")

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
    }
})

QuesitonSchema.pre("save", function (next) {
    console.log("helo")
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

module.exports = mongoose.model("Question", QuesitonSchema)