import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import Question from "../models/question.model.js"

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
        default: true,
    },
    resetPasswordToken: {
        type: String
    },
    question: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Question"
        }
    ],
    answer: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Answer"
        }
    ],
    token: {
        type: String
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

UserSchema.methods.getResetPasswordTokenFromUser = function () {
    const randomHexString = crypto.randomBytes(16).toString("hex")
    const resetPasswordToken = crypto
        .createHash("SHA256")
        .update(randomHexString)
        .digest("hex")
    const { RESET_PASSWORD_EXPIRE } = process.env
    this.resetPasswordToken = resetPasswordToken
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE)
    return resetPasswordToken
}

UserSchema.pre("save", function (next) {
    // password is change?
    if (!this.isModified("password")) {
        next()
    }

    // if password is not change, password is hashed
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err)
            this.password = hash
            next()
        })
    })
})

const User = mongoose.model("User", UserSchema)

export default User