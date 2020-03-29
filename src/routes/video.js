import { Router } from 'express';
import video from '../controllers/video';
import access from '../middlewares/access';
import session from '../middlewares/viewingSessions';
import earnings from '../controllers/earning';

// import imageValidation from '../middlewares/validators/imageValidator'
const router = new Router();
router.post('/new', access.isAdmin, video.addVideo);
router.get('/all/local', access.isAdmin, video.getAllVideosLocal);
router.get('/sort/pop', access.isNormalUser, video.getVideosByPopularity);
router.get('/sort/category', access.isNormalUser, video.getVideosByCategory);
router.get('/sort/trend', access.isNormalUser, video.getVideosByTrend);
router.get('/search', access.isNormalUser, video.search);
router.get('/unique', access.isNormalUser, session.createNewWatchCount, video.getVideoById);
router.get('/cp/unique', access.isProducer, video.getVideoById);
router.get('/arrivals', access.isNormalUser, video.getAllNewVideos);
router.get('/earnings', earnings.getAllEarningsPerVideo);
router.get('/main/ft', access.isNormalUser, video.getMainFeaturedFilm);
router.get('/second/ft', access.isNormalUser, video.getSecondFeaturedFilm);
router.get('/sort/type', access.isProducer, video.getAllVideosByType);
router.put('/', access.isProducer, video.updateVideos);
router.delete('/', access.isProducer, video.deleteAvideo);

export default router;
