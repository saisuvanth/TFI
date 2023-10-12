import { Router } from 'express';
import { validate } from '../utils/validation';
import { body } from 'express-validator';
import { isAuth } from '../middlewares/authMiddleware';
import { ProtectedRequest } from '../typings';
import { userLogin, userSignup } from '../controllers/authController';


const authRouter = Router();


authRouter.post('/signup', validate([
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 6 })
]), async (req, res, next) => {
    userSignup(req.body)
        .then(user => res.status(200).json({ message: 'User created successfully', user }))
        .catch(err => next(err))
        .finally(next);
})

authRouter.post('/signin', validate([
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
]), async (req, res, next) => {
    userLogin(req.body)
        .then(user => res.status(200).json({ message: 'User logged in successfully', user }))
        .catch(err => next(err))
        .finally(next);
});

authRouter.get('/me', isAuth, async (req: ProtectedRequest, res, next) => {
    res.status(200).json({ user: req.user });
})




export default authRouter;