import controller from '../controllers/viewingSessionsController';
import { Router } from 'express';

const router = new Router();

router.get('/',controller.getSpecificSessions);

export default router;