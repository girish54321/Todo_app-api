import { Router } from 'express'
const fileUploadRoute = Router()
import { uploadFile } from '../controller/fileUploadController'
import { uploadFileMulter } from '../middlewares/fileUpload'

fileUploadRoute.post("/file-upload", uploadFileMulter.single('file'), uploadFile)

export default fileUploadRoute
