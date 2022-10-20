const express = require("express")
const router = express.Router()
const { getAccessToRoute, getAdminAccess } = require("../middlewares/auth.middleware")
const { blockUser, deleteUser } = require("../controllers/admin.contoller")
const { checkUserExist } = require("../helpers/db/db.error.helpers")

router.use([getAccessToRoute, getAdminAccess])

router.get("/blockUser/:id", checkUserExist, blockUser)
router.delete("/deleteUser/:id", checkUserExist, deleteUser)

module.exports = router