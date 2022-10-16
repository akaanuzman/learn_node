const express = require("express")
const router = express.Router()
const auth = require("./auth")
const questions = require("./questions")

router.use("/auth", auth)
router.use("/questions", questions)

module.exports = router