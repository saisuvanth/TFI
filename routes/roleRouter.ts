import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware";
import { validate } from "../utils/validation";
import { body } from "express-validator";
import { addRole, getRoles } from "../controllers/roleController";

const roleRouter = Router();


roleRouter.route('/')
    .post(isAuth, validate([body('name').isLength({ min: 2 })]), (req, res, next) => {
        addRole(req.body.name)
            .then(role => res.status(200).json({ message: 'Role created successfully', ...role }))
            .catch(err => next(err))
            .finally(next)
    })
    .get((req, res, next) => {
        getRoles()
            .then(roles => res.status(200).json({ ...roles }))
            .catch(err => next(err))
            .finally(next)
    })



export default roleRouter;