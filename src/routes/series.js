import { Router } from 'express';
import controller from '../controllers/series';
import access from '../middlewares/access';
import viewingSession from '../middlewares/viewingSessions';

const router = new Router();

router.post('/create', access.isAdmin, controller.create);
router.get('/cp', access.isProducer, controller.getVideosByClientId);
router.get('/ep', access.isNormalUser, viewingSession.createNewWatchCount, controller.getSingleEpisode);
router.get('/single/season', access.isNormalUser, controller.getSingleSeason);
router.get('/all/seasons', access.isLoggedIn, controller.getAllSeasons);
router.put('/update', access.isProducer, controller.updateSerie);
router.delete('/delete', access.isAdmin, controller.delete);

export default router;
