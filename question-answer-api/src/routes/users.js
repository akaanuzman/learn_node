const express = require("express")
const router = express.Router()
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { getAllUsers, getUserById } = require("../controllers/user.controller")
const { checkUserExist } = require("../helpers/db/db.error.helpers")

router.get("/getAllUsers", getAccessToRoute, getAllUsers)
router.get("/:id", getAccessToRoute, checkUserExist, getUserById)

module.exports = router