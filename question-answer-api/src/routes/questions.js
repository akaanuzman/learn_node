const express = require("express")
const router = express.Router()
const { getAccessToRoute, getQuestionOwnerAccess } = require("../middlewares/auth.middleware")
const { checkQuesitonExist } = require("../helpers/db/db.error.helpers")
const {
    getAllQuestions, getQuestion,
    addQuestion, updateQuestion
} = require("../controllers/quesitons.controller")

router.use(getAccessToRoute)
router.get("/allQuestions", getAllQuestions)
router.get("/getQuestion/:id", checkQuesitonExist, getQuestion)
router.post("/ask", addQuestion)
router.put(
    "/updateQuestion/:id",
    checkQuesitonExist,
    getQuestionOwnerAccess,
    updateQuestion
)

module.exports = router