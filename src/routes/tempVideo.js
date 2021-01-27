import { Router } from 'express';
import controllers from '../controllers/tempVideo';
import access from '../middlewares/access';
import { addVideo } from '../middlewares/validation/video';

const router = new Router();
router.get('/all', access.isAdmin, controllers.getAllVideosController);
router.get('/', access.isAdmin, controllers.getParticularVideoController);
router.get('/signed-urls', access.isAdmin, controllers.getSignedUrlTempVideos);
router.delete('/', access.isAdmin, controllers.deleteParticularVideoController);
router.post('/new', access.isAdmin, addVideo, controllers.createVideoController);
router.put('/update', access.isAdmin, controllers.updateParticularVideoController);
router.put('/update/temp', access.isAdmin, controllers.updateParticularTempVideoController);

export default router;
