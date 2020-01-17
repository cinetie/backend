import auth from '../controllers/cpController'
import passport from 'passport'
import '../config/passport'
import {Router} from 'express'
import access from '../middlewares/access'
import isAdmin from '../middlewares/isAdmin'
import earnings from '../controllers/earningControlller'
const router = new Router()

router.use(passport.initialize())
router.use(passport.session())

router.post('/signup',auth.signupCp)
router.post('/login',isAdmin.verifyAdmin,auth.loginUser)
router.delete('/delete_acc',access.isProducer,auth.deleteAccount)
router.get('/all',access.isAdmin,auth.getAllAccounts)
router.get('/reset_password/',auth.resetPassword)
router.post('/forgot_password',auth.forgotPassword)
router.get('/verify/',auth.verify)
router.get('/earnings/active/video',access.isProducer,earnings.getActiveEarningsPerVideo)
router.get('/earnings/active',access.isProducer,earnings.getActiveEarningsPerClient)
router.get('/earnings',access.isProducer,earnings.getEarningsPerClient)
router.get('/videos',access.isProducer,auth.getAllVideosLocal)
router.put('/update',access.isProducer,auth.updateAccount)
router.get(
	'/google',
	passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	})
)
router.get('/google/redirect', passport.authenticate('google'), auth.socialLogin)

router.get(
	'/facebook',
	passport.authenticate('facebook', {
		scope: ['email']
	})
)
router.get('/facebook/redirect', passport.authenticate('facebook'), auth.socialLogin)
export default router