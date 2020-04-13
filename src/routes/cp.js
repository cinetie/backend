import { Router } from 'express';
import passport from 'passport';
import auth from '../controllers/cp';
import '../config/passport';
import access from '../middlewares/access';
import isAdmin from '../middlewares/isAdmin';
import * as validation from '../middlewares/validation/cp';
import earnings from '../controllers/earning';

const router = new Router();

router.use(passport.initialize());
router.use(passport.session());

router.post('/signup', validation.signup, auth.signupCp);
router.get('/details', access.isProducer, auth.getCpDetails);
router.post('/login', isAdmin.verifyAdmin, validation.login, auth.loginUser);
router.delete('/delete_acc', access.isProducer, auth.deleteAccount);
router.get('/all', access.isAdmin, auth.getAllAccounts);
router.post('/reset-password/', auth.resetPassword);
router.post('/forgot-password', auth.forgotPassword);
router.get('/verify/', auth.verify);
router.get('/earnings/active/video', access.isProducer, earnings.getActiveEarningsPerVideo);
router.get('/earnings/active', access.isProducer, earnings.getActiveEarningsPerClient);
router.get('/earnings', access.isProducer, earnings.getEarningsPerClient);
router.get('/videos', access.isProducer, auth.getAllVideosLocal);
router.put('/update', access.isProducer, auth.updateAccount);
router.get('/serve-verify', auth.serveVerifyPassword);
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
