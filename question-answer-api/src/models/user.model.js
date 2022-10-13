const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Please provide a lastname"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Please try different email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ],

    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minlenght: [6, "Please provide a password with min lenght 6"],
        required: [true, "Please provide a password"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    img: {
        type: String,
        default: "default.svg"
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("User",UserSchema)