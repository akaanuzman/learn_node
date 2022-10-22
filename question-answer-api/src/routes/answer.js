const express = require("express")
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { checkAnswerExist } = require("../helpers/db/db.error.helpers")
const { getAllAnswers, getAnswerById, addNewAnswerToQuestion } = require("../controllers/answer.controller")
const router = express.Router({ mergeParams: true })

router.use(getAccessToRoute)
router.get("/", getAllAnswers)
router.get("/:answerId", checkAnswerExist, getAnswerById)
router.post("/", getAccessToRoute, addNewAnswerToQuestion)

module.exports = router