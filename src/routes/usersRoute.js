import auth from '../controllers/usersController';
import auth2 from '../middlewares/doorman';
import {Router} from 'express';

const router = new Router();

router.post('/auth/signup',auth.signupUser);
router.post('/auth/login',auth.loginUser);
router.get('/dv',auth2.isTokenValid);
export default router;