const mongoose = require("mongoose")


const QuesitonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        minlength: [20, "Please provide a title at least 20 characters"],
        unique: true,
    },
    subtitle: {
        type: String,
        required: [true, "Please provide a subtitle"],
        minlength: [60, "Please provide a subtitle at least 60 characters"],
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
        ref: "User"
    }
})

module.exports = mongoose.model("Question", QuesitonSchema)