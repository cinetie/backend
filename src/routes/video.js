import { Router } from 'express';
import video from '../controllers/video';
import access from '../middlewares/access';
import earnings from '../controllers/earning';
import billing from '../middlewares/billing';
import { updateVideo } from '../middlewares/validation/video';
// import imageValidation from '../middlewares/validators/imageValidator'
const router = new Router();
router.post('/new', access.isAdmin, video.addVideo);
router.post('/watch-session', access.isNormalUser, video.createNewWatchCount);
router.get('/all/local', access.isAdmin, video.getAllVideosLocal);
router.get('/sort/pop', access.isNormalUser, video.getVideosByPopularity);
router.get('/sort/category', access.isNormalUser, video.getVideosByCategory);
router.get('/sort/trend', access.isNormalUser, video.getVideosByTrend);
router.get('/search', access.isNormalUser, video.search);
// router.get('/unique', access.isNormalUser, billing.trial, billing.verifyPermissionLevel, video.getVideoById); removed temporarily billing.trial
router.get('/unique', access.isNormalUser, billing.verifyPermissionLevel, video.getVideoById);
router.get('/cp/unique', access.isAdmin, video.getVideoById);
router.get('/arrivals', access.isNormalUser, video.getAllNewVideos);
router.get('/earnings', earnings.getAllEarningsPerVideo);
router.get('/main/ft', access.isNormalUser, video.getMainFeaturedFilm);
router.get('/second/ft', access.isNormalUser, video.getSecondFeaturedFilm);
router.get('/sort/type', access.isProducer, video.getAllVideosByType);
router.put('/', access.isAdmin,updateVideo, video.updateVideos);
router.put('/set-featured', access.isAdmin, video.featureVideo);
router.delete('/', access.isAdmin, video.deleteAvideo);

export default router;
