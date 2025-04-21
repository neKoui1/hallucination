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