const express = require("express")
const router = express.Router()
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { checkQuesitonExist } = require("../helpers/db/db.error.helpers")
const { getAllQuestions, getQuestion, addQuestion } = require("../controllers/quesitons.controller")

router.use(getAccessToRoute)
router.get("/allQuestions", getAllQuestions)
router.get("/getQuestion/:id", checkQuesitonExist, getQuestion)
router.post("/ask", addQuestion)

module.exports = router