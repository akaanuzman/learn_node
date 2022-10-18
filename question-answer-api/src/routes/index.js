const express = require("express")
const router = express.Router()
const auth = require("./auth")
const users = require("./users")
const questions = require("./questions")

router.use("/auth", auth)
router.use("/users", users)
router.use("/questions", questions)

module.exports = router