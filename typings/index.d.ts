import { Request } from 'express'
import { User } from '../models'

interface ProtectedRequest extends Request {
    user?: User
}