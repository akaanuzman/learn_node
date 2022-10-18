const express = require("express")
const router = express.Router()
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { register, login, tokenControl, forgotPassword, imageUpload } = require("../controllers/auth.controller")
const profileImageUpload = require("../middlewares/image.upload")

router.post("/login", login)

router.post("/register", register)

router.get("/tokenControl", getAccessToRoute, tokenControl)

router.post("/forgotPassword", forgotPassword)

router.post(
    "/upload",
    [getAccessToRoute, profileImageUpload.single("profile_image")],
    imageUpload
)

module.exports = router