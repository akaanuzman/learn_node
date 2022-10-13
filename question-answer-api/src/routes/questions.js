const express = require("express")
const router = express.Router()

const { home, onDelete, onUpdate } = require("../controllers/quesitons.controller")

router.get("/", home)

router.delete("/delete", onDelete)

router.put("/update", onUpdate)

module.exports = router