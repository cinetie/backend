import { Router } from 'express'
import controller from '../controllers/seriesController'
import access from '../middlewares/access'
const router = new Router()

router.post('/create',access.isProducer,controller.create)
router.get('/ep',access.isNormalUser,controller.getSingleEpisode)
router.get('/single/season',access.isNormalUser,controller.getSingleSeason)
router.get('/all/seasons',access.isNormalUser,controller.getAllSeasons)
router.put('/update',access.isProducer,controller.updateSerie)
router.delete('/delete',access.isAdmin,controller.delete)

export default router