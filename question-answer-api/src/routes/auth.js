import express from "express"
import { getAccessToRoute } from "../middlewares/auth.middleware.js"
import {
    register, login,
    tokenControl, forgotPassword,
    resetPassword, imageUpload
} from "../controllers/auth.controller.js"
import profileImageUpload from "../middlewares/image.upload.js"
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/tokenControl", getAccessToRoute, tokenControl)
router.post("/forgotPassword", forgotPassword)
router.put("/resetPassword", resetPassword)
router.post(
    "/imageUpload",
    [getAccessToRoute, profileImageUpload.single("profile_image")],
    imageUpload
)

export default router