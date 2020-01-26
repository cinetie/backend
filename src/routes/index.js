import { Router } from 'express'
import usersRoute from './usersRoute'
import profileRoute from './profileRoute'
import planRoute from './planRoute'
import access from '../middlewares/access'
import transRoute from '../routes/transRoute'
import videoRoute from '../routes/videoRoutes'
import videoSessionRoute from '../routes/videoSessionRoutes'
import cpRoutes from '../routes/cpRoutes'
import cpTransRoutes from '../routes/cpTransRoutes'
import tempVideoRouters from '../routes/tempVideoRoute'
import trailerRoutes from '../routes/trailerRoutes'
import admin from '../routes/adminRoutes'
import series from '../routes/seriesRoutes'
import tempSeries from '../routes/tempSerieRoutes'
const router = Router()

router.use('/cp',cpRoutes)
router.use('/auth', usersRoute)
router.use('/plan' ,planRoute)
router.use('/trans',transRoute)
router.use('/video',videoRoute)
router.use('/cp/trans',cpTransRoutes)
router.use('/sessions/video',access.isProducer,videoSessionRoute)
router.use('/profile',access.isNormalUser, profileRoute)
router.use('/temp',tempVideoRouters)
router.use('/trailer',trailerRoutes)
router.use('/admin',admin)
router.use('/series',series)
router.use('/temp/series',tempSeries)
export default router