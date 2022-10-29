import express from "express"
import { getAccessToRoute } from "../middlewares/auth.middleware.js"
import {
    getAllUsers,
    getUserById,
    editProfile
} from "../controllers/user.controller.js"
import { checkUserExist } from "../helpers/db/db.error.helpers.js"

const router = express.Router()

router.use(getAccessToRoute)

router.get("/getAllUsers", getAllUsers)
router.get("/:id", checkUserExist, getUserById)
router.put("/edit", editProfile)

export default router