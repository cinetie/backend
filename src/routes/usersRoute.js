import passport from 'passport';
import { Router } from 'express';
import auth from '../controllers/usersController';
import validation from '../middlewares/validators/userValidation';
import '../config/passport';
import access from '../middlewares/access';
import screenValidator from '../middlewares/screenValidation';
import earnings from '../middlewares/earnings';
import isAdmin from '../middlewares/isAdmin';
import billing from '../middlewares/billing';

const router = new Router();

router.use(passport.initialize());
router.use(passport.session());

router.post('/signup', validation.user, auth.signupUser);
router.get('/particular', auth.getUserByEmail);
router.post('/login', isAdmin.verifyAdmin, billing.renewPayment, earnings.registerEarnings, billing.verifyPermissionLevel, screenValidator.validateNumberOfScreens, auth.loginUser);
router.put('/logout', auth.logout);
router.delete('/delete_acc', access.isNormalUser, auth.deleteAccount);
router.get('/all', access.isAdmin, auth.getAllAccounts);
router.post('/reset_password/', auth.resetPassword);
router.post('/forgot_password', auth.forgotPassword);
router.get('/verify', auth.verify);
router.get('/my-account', auth.getUserProfile);
router.put('/signup/cont', auth.updateAccountAndSubscription);
router.put('/update', validation.updateUser, auth.updateAccount);
router.get('/users', access.isAdmin, auth.getSubscribersInRange);
router.get('/users/live', access.isAdmin, auth.getLiveUsers);
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
