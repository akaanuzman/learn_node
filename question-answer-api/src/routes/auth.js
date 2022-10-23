const express = require("express")
const router = express.Router()
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const {
    register, login,
    tokenControl, forgotPassword,
    resetPassword, imageUpload
} = require("../controllers/auth.controller")
const profileImageUpload = require("../middlewares/image.upload")

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

module.exports = router