import {Request} from 'express'

export interface RegisterRequest extends Request {
    body: {
        name: string,
        email: string,
        password: string,
    }
}

export interface LoginRequest extends Request {
    body: {
        email: string,
        password: string,
    }
}

export interface GetAllUserRequest 
extends Request<{}, any, any, {
    limit?:string,
    page?:string,
    sort?:string,
}>{}

export interface GetUserByIdRequest extends Request {
    params: {
        id: string,
    }
}

export interface CreateUserRequest extends Request {
    body: {
        name: string,
        email: string,
        password: string,
    }
}

export interface UpdateUserRequest extends Request {
    params: {
        id: string,
    }
    body: {
        name?: string,
        email?: string,
        password?: string,
    }
}

export interface DeleteUserRequest extends Request {
    params: {
        id: string
    }
}

export interface User {
    id: string,
    name: string,
    email: string,
    // 其他可能的用户属性
    [key: string]: any,
}

export interface AuthenticatedRequest extends Request {
    user: User,
}

