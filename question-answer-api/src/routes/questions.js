const express = require("express")
const router = express.Router()
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { addQuestion, onDelete, onUpdate } = require("../controllers/quesitons.controller")

router.post("/ask", getAccessToRoute ,addQuestion)

router.delete("/delete", onDelete)

router.put("/update", onUpdate)

module.exports = router