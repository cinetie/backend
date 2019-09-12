import auth from '../controllers/usersController';
import {Router} from 'express';

const router = new Router();

router.post('/auth/signup',auth.signupUser);
router.post('/auth/login',auth.loginUser);
router.post('/auth/reset_password/',auth.resetPassword);
router.post('/auth/forgot_password',auth.forgotPassword);
router.get('/auth/verify/',auth.verify);
export default router;