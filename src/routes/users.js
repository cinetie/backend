import passport from 'passport';
import { Router } from 'express';
import auth from '../controllers/users';
import * as validation from '../middlewares/validation/user';
import '../config/passport';
import access from '../middlewares/access';
import screenValidator from '../middlewares/screenValidation';
import isAdmin from '../middlewares/isAdmin';
import billing from '../middlewares/billing';

const router = new Router();

router.use(passport.initialize());
router.use(passport.session());

router.post('/signup', validation.signup, auth.signupUser);
router.get('/particular', auth.getUserByEmail);
router.post('/login', isAdmin.verifyAdmin, validation.login, billing.renewPayment, screenValidator.validateNumberOfScreens, auth.loginUser);
router.put('/logout', auth.logout);
router.delete('/my-account/delete', access.isNormalUser, auth.deleteAccount);
router.get('/all', access.isAdmin, auth.getAllAccounts);
router.post('/reset-password', auth.resetPassword);
router.post('/forgot-password', auth.forgotPassword);
router.get('/verify', auth.verify);
router.get('/my-account', auth.getUserProfile);
router.put('/signup/cont', access.isNormalUser, auth.createSubcription);
router.put('/my-account/activate', access.isNormalUser, auth.updateAccountAndSubscription);
router.put('/update', access.isNormalUser, auth.updateAccount);
router.get('/users', access.isAdmin, auth.getSubscribersInRange);
router.get('/users/live', access.isAdmin, auth.getLiveUsers);
router.get('/serve-verify', auth.serveVerifyPassword);
router.post('/otp-verify', access.isNormalUser, auth.verifyOTP);
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
