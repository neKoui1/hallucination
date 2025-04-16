import {Request, Response} from 'express'
import Data from '../models/Data'

// 用户只能查询自己上传的数据
export const getUserData = async(req: Request, res: Response) => {
    try {
        // 查询时过滤掉userId = 当前用户的id
        const data = await Data.find({
            userId: req.user?._id,
        })
        res.json(data)
    } catch(err) {
        res.status(500).json({
            error: '数据查询失败',
        })
    }
}

// 用户上传数据时自动绑定当前用户的id
export const uploadData = async(req: Request, res: Response) => {
    try {
        const {content} = req.body
        const newData = new Data({
            content,
            userId: req.user?._id,
        })
        await newData.save()
        res.status(201).json(newData)
    } catch(err) {
        res.status(500).json({
            error: "数据上传失败",
        })
    }
}