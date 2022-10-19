const express = require("express")
const router = express.Router()
const auth = require("./auth")
const users = require("./users")
const admin = require("./admin")
const questions = require("./questions")

router.use("/auth", auth)
router.use("/users", users)
router.use("/admin", admin)
router.use("/questions", questions)

module.exports = router