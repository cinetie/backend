import { Router } from 'express';
import controller from '../controllers/transations';

const route = new Router();
route.post('/new', controller.createNewTrans);
export default route;
