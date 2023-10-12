import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware";
import { validate } from "../utils/validation";
import { body, param } from "express-validator";
import { addMember, removeMember } from "../controllers/memberController";
import { ProtectedRequest } from "../typings";

const memberRouter = Router();


memberRouter.use(isAuth);


memberRouter.post('/', validate([
    body('community').isAlphanumeric(),
    body('user').isAlphanumeric(),
    body('role').isAlphanumeric()
]), (req: ProtectedRequest, res, next) => {
    addMember({ ...req.body, owner: req.user?.id })
        .then(member => res.status(200).json({ message: 'Member added successfully', ...member }))
        .catch(err => next(err))
        .finally(next)
})


memberRouter.delete('/:id', validate([param('id').isAlphanumeric()]), (req, res, next) => {
    removeMember(req.params.id)
        .then(member => res.status(200).json({ message: 'Member removed successfully', ...member }))
        .catch(err => next(err))
        .finally(next)
})





export default memberRouter;