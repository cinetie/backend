import { Router } from 'express';
import controller from '../controllers/transations';
import access from '../middlewares/access';

const route = new Router();
route.post('/new', access.isNormalUser, controller.createNewTrans);
route.get('/get-session-id', access.isNormalUser, controller.getNewSessionId);
export default route;
