import { Router } from 'express';
import controller from '../controllers/series';
import access from '../middlewares/access';

const router = new Router();

router.post('/create', access.isAdmin, controller.create);
router.get('/cp', access.isProducer, controller.getVideosByClientId);
router.get('/ep', access.isNormalUser, controller.getSingleEpisode);
router.get('/single/season', access.isNormalUser, controller.getSingleSeason);
router.get('/all/seasons', access.isLoggedIn, controller.getAllSeasons);
router.get('/cp/single/season', access.isProducer, controller.getSingleSeason);
router.put('/update', access.isProducer, controller.updateSerie);
router.delete('/delete/:id', access.isProducer, controller.delete);

export default router;
