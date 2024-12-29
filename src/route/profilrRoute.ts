import { Router } from 'express'
import { verifyAccessToken } from '../helper/jwthelper'
import { getProfile, updatePofile } from '../controller/usersController'
const profileRoute = Router()

// profileRoute.post("/active", createAccount)
profileRoute.get("/user-profile", verifyAccessToken, getProfile)
profileRoute.post("/update-profile", verifyAccessToken, updatePofile)

export default profileRoute
