import express from "express"
import { getAccessToRoute, getQuestionOwnerAccess } from "../middlewares/auth.middleware.js"
import { checkQuesitonExist } from "../helpers/db/db.error.helpers.js"
import {
    getAllQuestions, getQuestion,
    addQuestion, updateQuestion,
    deleteQuestion, favQuestion,
    unFavQuestion
} from "../controllers/quesitons.controller.js"
import answer from "../routes/answer.js"

const router = express.Router()

router.use(getAccessToRoute)
router.get("/allQuestions", getAllQuestions)
router.get("/getQuestion/:id", checkQuesitonExist, getQuestion)
router.post("/ask", addQuestion)
router.put(
    "/updateQuestion/:id",
    [checkQuesitonExist,
        getQuestionOwnerAccess],
    updateQuestion
)
router.delete("/deleteQuestion/:id",
    [checkQuesitonExist,
        getQuestionOwnerAccess],
    deleteQuestion
)
router.get("/favQuestion/:id",
    checkQuesitonExist,
    favQuestion
)
router.get("/unFavQuestion/:id",
    checkQuesitonExist,
    unFavQuestion
)
router.use("/:id/answers", checkQuesitonExist, answer)

export default router