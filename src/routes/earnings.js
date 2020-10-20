import { Router } from 'express';
import controller from '../controllers/earning';
import access from '../middlewares/access';

const app = Router();

app.post('/calculate-per-user', access.isNormalUser,controller.calculateEarningsPerUser);

export default app;
