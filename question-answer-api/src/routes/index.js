import express from "express"
import auth from "./auth.js"
import users from "./users.js"
import admin from "./admin.js"
import questions from "./questions.js"

const router = express.Router()

router.use("/auth", auth)
router.use("/users", users)
router.use("/admin", admin)
router.use("/questions", questions)

export default router