import { Router } from 'express';
import controller from '../controllers/transationsController';

const route = new Router();
route.post('/new',controller.createNewTrans);

export default route;