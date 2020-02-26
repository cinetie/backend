import { Router } from 'express';
import controller from '../controllers/viewingSessionsController';

const router = new Router();

router.get('/', controller.getSpecificSessions);
router.get('/user', controller.getAllSessionsPerUser);
export default router;
