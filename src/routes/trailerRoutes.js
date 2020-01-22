import { Router } from 'express'
import controller from '../controllers/trailerController'
import access from '../middlewares/access'
const router = new Router()

router.post('/new',controller.createNewTrailer)
router.get('/sort/video',controller.getAllTrailersPerVideo)
router.get('/particular',controller.getParticularTrailerController)
router.get('/all',access.isAdmin,controller.getAllTrailerController)
router.put('/update',access.isAdmin,controller.updateParticularTrailerController)
router.delete('/delete',access.isAdmin,controller.deleteParticularTrailerController)

export default router