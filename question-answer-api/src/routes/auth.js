const express = require("express")
const router = express.Router()

const { register, login, error } = require("../controllers/auth.controller")

router.post("/login", login)

router.post("/register", register)

router.get("/error",error)

module.exports = router