import {Response} from 'express'
import { User } from '../models/user.model'
import { CreateUserRequest, DeleteUserRequest, GetAllUserRequest, GetUserByIdRequest, UpdateUserRequest } from '../types/request.types'
import { BaseResponse, UsersListResponse, UserResponse, NotFoundResponse, ValidationErrorResponse } from '../types/response.types'
import { DateSchemaDefinition } from 'mongoose'




export class UserController {
    // 获取所有用户
    public getAllUsers = async(
        req: GetAllUserRequest,
        res: Response<UsersListResponse | BaseResponse>
    ): Promise<void> => {
        try {
            const {limit = '10', page = '1', sort} = req.query || {}

            const options = {
                limit: parseInt(limit, 10),
                skip: (parseInt(page, 10)-1) * parseInt(limit, 10),
                sort: sort? {[sort]: 1} : {createdAt:-1}
            }

            const users = await User.find({}, null, options)
            res.status(200).json({
                success: true,
                data: users.map((user) => ({
                    id: (user._id as any).toString(),
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt as Date,
                    updatedAt: user.updatedAt as Date
                })),
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: '获取用户列表失败',
                error
            })
        }
    }

    public getUserById = async(
        req: GetUserByIdRequest,
        res: Response<UserResponse|NotFoundResponse|BaseResponse>
    ): Promise<void> => {
        try {
            const {id} = req.params
            const user = await User.findById(id)

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: '用户不存在',
                })
                return
            }

            res.status(200).json({
                success: true,
                data: {
                    id: (user._id as any).toString(),
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt as Date,
                    updatedAt: user.updatedAt as Date,
                }
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: '获取用户信息失败',
                error,
            })
        }
    }

    public createUser = async(
        req: CreateUserRequest,
        res: Response<UserResponse | ValidationErrorResponse | BaseResponse>
    ): Promise<void> => {
        try {
            const {name, email, password} = req.body
            const newUser = await User.create({
                name, email, password
            })

            res.status(201).json({
                success: true,
                data: {
                    id: (newUser._id as any).toString(),
                    name: newUser.name,
                    email: newUser.email,
                    createdAt: newUser.createdAt as Date,
                    updatedAt: newUser.updatedAt as Date,
                }
            })
        } catch(error) {
            res.status(400).json({
                success: false,
                message: '创建用户失败',
                error,
            })
        }
    }

    public updateUser = async(
        req: UpdateUserRequest,
        res: Response<UserResponse | NotFoundResponse | ValidationErrorResponse>,
    ): Promise<void> => {
        try {
            const {id} = req.params
            const updateUser = await User.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            })

            if (!updateUser) {
                res.status(404).json({
                    success: false,
                    message: '用户不存在',
                })
                return
            }

            res.status(200).json({
                success: true,
                data: {
                    id: (updateUser._id as any).toString(),
                    name: updateUser.name,
                    email: updateUser.email,
                    createdAt: updateUser.createdAt as Date,
                    updatedAt: updateUser.updatedAt as Date,
                }
            })
        } catch(error) {
            res.status(400).json({
                success: false,
                message: '更新用户失败',
                error,
            })
        }
    }


    public deleteUser = async (
        req: DeleteUserRequest,
        res: Response<BaseResponse | NotFoundResponse>
    ): Promise<void> => {
        try {
            const {id} = req.params
            const deleteUser = await User.findByIdAndDelete(id)

            if (!deleteUser) {
                res.status(404).json({
                    success: false,
                    message: '用户不存在',
                })
                return
            }
            res.status(200).json({
                success: true,
                message: '用户已删除',
            })
        } catch(error) {
            res.status(400).json({
                success: false,
                message: '删除用户失败',
                error,
            })
        }
    }

}



