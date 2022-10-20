const express = require("express")
const router = express.Router()
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { getAllQuestions, addQuestion } = require("../controllers/quesitons.controller")

router.use(getAccessToRoute)
router.get("/allQuestions", getAllQuestions)
router.post("/ask", addQuestion)

module.exports = router