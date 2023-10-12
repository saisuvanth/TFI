import { NextFunction, Response } from "express";
import { User } from "../models";
import { verify } from 'jsonwebtoken';
import { ProtectedRequest } from "../typings";

interface Token {
    id: string;
}

export const isAuth = async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET as string);
        let decodedToken = decoded as Token;
        console.log(decodedToken);
        let user = await User.findOne({
            where: {
                id: decodedToken.id
            }
        });
        if (!user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.user = user.toJSON();
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
}