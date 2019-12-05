import video from '../controllers/videoController';
import middleWares from '../middlewares/viewingSessions';
import { Router } from 'express';

const router = new Router();
router.post('/new',video.addVideo);
router.get('/',video.getParticularVideo);
router.post('/watchCount',middleWares.createNewWatchCount)
router.get('/',video.getAllVideo);
router.get('/find',video.search);
router.put('/',video.updateVideos);
router.delete('/',video.deleteAvideo);
export default router;