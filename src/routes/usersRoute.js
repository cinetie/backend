
import signup from '../controllers/usersController';

import {Router} from 'express';

const router = new Router();


router.post('/signup',signup.createUser);

export default router;