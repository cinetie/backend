import { Router } from 'express';
import usersRoute from './usersRoute';
import profileRoute from './profileRoute';
import planRoute from './planRoute';

const router = Router();

router.use('/auth', usersRoute);
router.use('/plan', planRoute);
router.use('/profile', profileRoute);

export default router