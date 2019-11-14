import { Router } from 'express';
import usersRoute from './usersRoute';
import profileRoute from './profileRoute';
import planRoute from './planRoute';
import access from '../middlewares/access';
import transRoute from '../routes/transRoute';
import videoRoute from '../routes/videoRoutes';
import videoSessionRoute from '../routes/videoSessionRoutes';
import cpRoutes from '../routes/cpRoutes';
const router = Router();

router.use('/cp',cpRoutes);
router.use('/auth', usersRoute);
router.use('/plan' ,planRoute);
router.use('/trans',transRoute);
router.use('/video',videoRoute);
router.use('/sessions/video',access.isAdmin,videoSessionRoute);
router.use('/profile',access.isNormalUser, profileRoute);

export default router;