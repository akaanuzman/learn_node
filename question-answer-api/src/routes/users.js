const express = require("express")
const router = express.Router()
const { getAccessToRoute } = require("../middlewares/auth.middleware")
const { getAllUsers, getUserById, editProfile } = require("../controllers/user.controller")
const { checkUserExist } = require("../helpers/db/db.error.helpers")

router.use(getAccessToRoute)

router.get("/getAllUsers", getAllUsers)
router.get("/:id", checkUserExist, getUserById)
router.put("/edit", editProfile)

module.exports = router