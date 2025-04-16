import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

declare global {
    namespace Express {
        interface Request {
            user?: {_id: string}
        }
    }
}

// jwt校验中间件
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if(!token) {
        return res.status(401).json({
            error: '未提供认证令牌',
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            _id: string
        }
        const user = await User.findById(decoded._id)

        if(!user) {
            return res.status(401).json({
                error: '该用户不存在',
            })
        }
        req.user = user
        next()
    } catch(err) {
        res.status(401).json({
            error: '令牌无效或令牌已过期',
        })
    }
}