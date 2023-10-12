import { Router } from 'express'
import authRouter from './authRouter';
import communityRouter from './communityRouter';
import roleRouter from './roleRouter';
import memberRouter from './memberRouter';


const router = Router();


router.use('/auth', authRouter);
router.use('/community', communityRouter);
router.use('/role', roleRouter);
router.use('/member', memberRouter);

export default router;