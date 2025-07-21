import { Router } from 'express'
import { ApiController } from '../controllers/ApiController.js'
import multer from 'multer'
import appRoot from "app-root-path"
import { join } from 'path'

const apiRouter = Router()
const upload = multer({dest: join(appRoot.path, '/tmp/')})

apiRouter.get('/sales', ApiController.getSales)
apiRouter.get('/generate-csv-file', ApiController.generateCsvFile)
apiRouter.post('/process-sales', upload.single('file'), ApiController.processSalesFile)

export default apiRouter