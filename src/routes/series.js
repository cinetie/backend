import { Router } from 'express';
import controller from '../controllers/series';
import access from '../middlewares/access';

const router = new Router();

router.post('/create', access.isAdmin, controller.create);
router.get('/cp', access.isProducer, controller.getVideosByClientId);
router.get('/ep', access.isNormalUser, controller.getSingleEpisode);
router.get('/single/season', access.isLoggedIn, controller.getSingleSeason);
router.get('/all/seasons', access.isLoggedIn, controller.getAllSeasons);
router.put('/update', access.isProducer, controller.updateSerie);
router.delete('/delete/:id', access.isAdmin, controller.delete);

export default router;
