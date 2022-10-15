const express = require("express")
const router = express.Router()
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { register, login, error } = require("../controllers/auth.controller")

router.post("/login", login)

router.post("/register", register)

router.get("/error", getAccessToRoute ,error)

module.exports = router