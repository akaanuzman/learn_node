const express = require("express")
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { checkAnswerExist } = require("../helpers/db/db.error.helpers")
const {
    getAllAnswers, getAnswerById,
    addNewAnswerToQuestion, updateAnswer,
    deleteAnswer
} = require("../controllers/answer.controller")
const router = express.Router({ mergeParams: true })

router.use(getAccessToRoute)

router.get("/", getAllAnswers)
router.post("/", getAccessToRoute, addNewAnswerToQuestion)
router.get("/:answerId", checkAnswerExist, getAnswerById)
router.put("/:answerId", checkAnswerExist, updateAnswer)
router.delete("/:answerId", checkAnswerExist, deleteAnswer)

module.exports = router