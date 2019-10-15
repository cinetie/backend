import { Router } from 'express';
import usersRoute from './usersRoute';
import profileRoute from './profileRoute';
import planRoute from './planRoute';
import access from '../middlewares/access';
import transRoute from '../routes/transRoute';
const router = Router();

router.use('/auth', usersRoute);
router.use('/plan' ,planRoute);
router.use('/trans',transRoute);
router.use('/profile',access.isNormalUser, profileRoute);

export default router