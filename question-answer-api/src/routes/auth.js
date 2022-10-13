const express = require("express")
const router = express.Router()

router.get("/login", (req, res) => {
    res.json({
        message: "Auth Login Page"
    })
})

router.get("/register", (req, res) => {
    res.json({
        message: "Auth Register Page"
    })
})

module.exports = router