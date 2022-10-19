const express = require("express")
const router = express.Router()
const { getAccessToRoute, getAdminAccess } = require("../middlewares/auth.middleware")

router.use([getAccessToRoute, getAdminAccess])

router.get("/test",(req,res,next) => {
    return res.status(200).json(
        {
            success: true,
            message: "admin page"
        }
    )
})

module.exports = router