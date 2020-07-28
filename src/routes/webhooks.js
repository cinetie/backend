import { Router } from 'express';
import WebHooks from '../controllers/webhooks';
import Authorization from '../middlewares/access';

const app = Router();

app.post('/rave', WebHooks.flutterWave);

export default app;
