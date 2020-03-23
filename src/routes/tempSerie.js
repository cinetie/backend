import { Router } from 'express';
import controller from '../controllers/tempSerie';
import access from '../middlewares/access';
import { addEpisode } from '../middlewares/validation/episode';

const router = new Router();

router.post('/new', access.isProducer, addEpisode, controller.createSerie);
router.get('/all', access.isAdmin, controller.getAllSeries);

export default router;
