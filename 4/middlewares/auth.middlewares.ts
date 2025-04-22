import { NextFunction, Response, RequestHandler } from "express";
import { AuthenticatedRequest } from "../src/types/request.types";
import jwt from 'jsonwebtoken'

interface JwtParload {
    id: string,
}

export const protect = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        let token
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }

        if(!token) {
            
            res.status(401).json({
                success: false,
                message: '请先登录以访问获取权限'
            })
            return 
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your_jwt_secret',
        ) as JwtParload
    }
}