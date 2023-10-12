import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware";
import { validate } from "../utils/validation";
import { body, param } from "express-validator";
import { createCommunity, getCommunities, getCommunityMembers, getJoinedCommunities, getOwnedCommunities } from "../controllers/communityController";
import { ProtectedRequest } from "../typings";

const communityRouter = Router();


// communityRouter.use(isAuth);

communityRouter.route('/')
    .post(isAuth, validate([body('name').isLength({ min: 2 })]), (req: ProtectedRequest, res, next) => {
        createCommunity({ ...req.body, ownerId: req.user?.id })
            .then(comm => res.status(200).json({ message: 'Community created successfully', ...comm }))
            .catch(err => next(err))
            .finally(next)
    })
    .get((req, res, next) => {
        getCommunities()
            .then(comms => res.status(200).json({ ...comms }))
            .catch(err => next(err))
            .finally(next)
    })

communityRouter.get('/:id/members', validate([param('id').isAlphanumeric()]), (req, res, next) => {
    getCommunityMembers(req.params.id)
        .then(comm => res.status(200).json({ ...(comm?.toJSON()) }))
        .catch(err => next(err))
        .finally(next)
})


communityRouter.get('/me/owner', isAuth, (req: ProtectedRequest, res, next) => {
    getOwnedCommunities(req.user?.id!)
        .then(comms => res.status(200).json({ ...comms }))
        .catch(err => next(err))
        .finally(next)
})


communityRouter.get('/me/member', isAuth, (req: ProtectedRequest, res, next) => {
    getJoinedCommunities(req.user?.id!)
        .then(comms => res.status(200).json({ ...comms }))
        .catch(err => next(err))
        .finally(next)
})


export default communityRouter;