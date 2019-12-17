import controllers from '../controllers/tempVideoController'
import { Router } from 'express'
import access from '../middlewares/access'
const router = new Router()
router.get('/all',access.isAdmin,controllers.getAllVideosController)
router.get('/',access.isAdmin,controllers.getParticularVideoController)
router.delete('/',access.isAdmin,controllers.deleteParticularVideoController)
router.post('/new',access.isAdmin,controllers.createVideoController)
router.put('/update',access.isAdmin,controllers.updateParticularVideoController)
export default router