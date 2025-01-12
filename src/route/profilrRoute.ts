import { Router } from 'express'
import { verifyAccessToken } from '../helper/jwthelper'
import { getProfile, updatePofile } from '../controller/usersController'
import { uploadFileMulter } from '../middlewares/fileUpload'
const profileRoute = Router()

// profileRoute.post("/active", createAccount)
profileRoute.get("/user-profile", verifyAccessToken, getProfile)
profileRoute.post("/update-profile", verifyAccessToken, uploadFileMulter.single('file'), updatePofile)

export default profileRoute
