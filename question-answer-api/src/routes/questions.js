const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "Questions Home Page"
    })
})

router.get("/delete", (req, res) => {
    res.json({
        message: "Questions Delete Page"
    })
})

module.exports = router