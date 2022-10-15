const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

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
        required: [true, "Please provide a email"],
        unique: true,
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
        minLength: [6, "Please provide a password with min lenght 6"],
        required: [true, "Please provide a password"],
        select: false
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

UserSchema.methods.generateJwtFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env
    const payload = {
        id: this._id,
        name: this.name
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE })

    return token
}

UserSchema.pre("save", function (next) {
    // password is change?
    if (!this.isModified("password")) next()

    // if password is not change, password is hashed
    bcrypt.genSalt(10, (err, hash) => {
        if (err) next(err)
        this.password = hash
        next()
    })
})

module.exports = mongoose.model("User", UserSchema)