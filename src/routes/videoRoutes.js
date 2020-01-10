import video from '../controllers/videoController'
import middleWares from '../middlewares/viewingSessions'
import { Router } from 'express'
import access from '../middlewares/access'
import session from '../middlewares/viewingSessions'
import validation from '../middlewares/validators/videoValidation'
import imageValidation from '../middlewares/validators/imageValidator'
const router = new Router()
router.post('/new',access.isAdmin,imageValidation.validateSmall,imageValidation.validateNameTag,imageValidation.validateTall,validation.video,video.addVideo)
router.get('/',access.isNormalUser,video.getParticularVideo)
router.post('/watchCount',middleWares.createNewWatchCount)
router.get('/all',access.isNormalUser,video.getAllVideo)
router.get('/all/local',access.isAdmin,video.getAllVideosLocal)
router.get('/sort/pop',access.isNormalUser,video.getVideosByPopularity)
router.get('/sort/category',access.isNormalUser,video.getVideosByCategory)
router.get('/sort/trend',access.isNormalUser,video.getVideosByTrend)
router.get('/search',access.isNormalUser,video.search)
router.get('/unique',access.isNormalUser,session.createNewWatchCount,video.getVideoById)
router.get('/arrivals',access.isNormalUser,video.getAllNewVideos)
router.get('/main/ft',access.isNormalUser,video.getMainFeaturedFilm)
router.get('/second/ft',access.isNormalUser,video.getSecondFeaturedFilm)
router.put('/',access.isAdmin,validation.updateVideo,video.updateVideos)
router.delete('/',access.isAdmin,video.deleteAvideo)
export default router