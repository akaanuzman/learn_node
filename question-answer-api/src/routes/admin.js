import express from "express"
import { getAccessToRoute, getAdminAccess} from "../middlewares/auth.middleware.js"
import { blockUser, deleteUser } from "../controllers/admin.contoller.js"
import { checkUserExist } from "../helpers/db/db.error.helpers.js"

const router = express.Router()

router.use([getAccessToRoute, getAdminAccess])

router.get("/blockUser/:id", checkUserExist, blockUser)
router.delete("/deleteUser/:id", checkUserExist, deleteUser)

export default router