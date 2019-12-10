import video from '../controllers/videoController'
import middleWares from '../middlewares/viewingSessions'
import { Router } from 'express'
import access from '../middlewares/access'
import session from '../middlewares/viewingSessions'
const router = new Router()
router.post('/new',video.addVideo)
router.get('/',video.getParticularVideo)
router.post('/watchCount',middleWares.createNewWatchCount)
router.get('/all',video.getAllVideo)
router.get('/sort/pop',access.isNormalUser,video.getVideosByPopularity)
router.get('/sort/category',access.isNormalUser,video.getVideosByCategory)
router.get('/sort/trend',access.isNormalUser,video.getVideosByTrend)
router.get('/search',video.search)
router.get('/unique',access.isNormalUser,session.createNewWatchCount,video.getVideoById)
router.put('/',video.updateVideos)
router.delete('/',video.deleteAvideo)
export default router