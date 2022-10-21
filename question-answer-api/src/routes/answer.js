const express = require("express")
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { getAllQuestions, addNewAnswerToQuestion } = require("../controllers/answer.controller")
const router = express.Router({ mergeParams: true })

router.get("/", getAccessToRoute, getAllQuestions)
router.post("/", getAccessToRoute, addNewAnswerToQuestion)

module.exports = router