import express from "express"
import { getAccessToRoute } from "../middlewares/auth.middleware.js"
import { checkAnswerExist } from "../helpers/db/db.error.helpers.js"
import {
    getAllAnswers, getAnswerById,
    addNewAnswerToQuestion, updateAnswer,
    deleteAnswer, favAnswer,
    unFavAnswer
} from "../controllers/answer.controller.js"
const router = express.Router({ mergeParams: true })

router.use(getAccessToRoute)

router.get("/", getAllAnswers)
router.post("/", addNewAnswerToQuestion)
router.get("/:answerId", checkAnswerExist, getAnswerById),
    router.put("/:answerId", checkAnswerExist, updateAnswer)
router.delete("/:answerId", checkAnswerExist, deleteAnswer)
router.get("/:answerId/favAnswer", checkAnswerExist, favAnswer)
router.get("/:answerId/unFavAnswer", checkAnswerExist, unFavAnswer)


export default router