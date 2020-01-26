import { Router } from 'express'
import controller from '../controllers/tempSerieController'
import access from '../middlewares/access'
const router = new Router()

router.post('/new',access.isProducer,controller.createSerie)
router.get('/all',access.isProducer,controller.getAllSeries)

export default router