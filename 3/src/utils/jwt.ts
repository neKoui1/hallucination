import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

const JWT_SECRET: string = '123456'

export interface AuthenticatedRequest extends Request {
    user?: {userId: string}
}

export function generateToken(userId:string): string {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: '1h'})
}

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.get('authorization')?.split(' ')[1]
}