import auth from '../controllers/cpController';
import passport from 'passport';
import '../config/passport';
import {Router} from 'express';
import access from '../middlewares/access';
const router = new Router();

router.use(passport.initialize());
router.use(passport.session());

router.post('/signup',auth.signupCp);
router.post('/login',auth.loginUser);
router.delete('/delete_acc',access.isProducer,auth.deleteAccount);
router.get('/all',access.isAdmin,auth.getAllAccounts);
router.post('/reset_password/',auth.resetPassword);
router.post('/forgot_password',auth.forgotPassword);
router.get('/verify/',auth.verify);
router.put('/update',access.isProducer,auth.updateAccount);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
        ]
    })
);
router.get('/google/redirect', passport.authenticate('google'), auth.socialLogin);

router.get(
'/facebook',
passport.authenticate('facebook', {
    scope: ['email']
})
);
router.get('/facebook/redirect', passport.authenticate('facebook'), auth.socialLogin);
export default router;