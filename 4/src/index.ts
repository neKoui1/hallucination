import cors from 'cors'
import dotenv from 'dotenv'
import express, {Application, Request, Response} from 'express'
import helmet from 'helmet'
import { connect } from 'http2'
import morgan from 'morgan'
import connectDB from './config/db'


dotenv.config()
connectDB()

const app: Application = express()
const PORT = process.env.PORT || 9090

app.use(helmet())
app.use(cors())

app.use(morgan('dev'))
app.use(express.json())
// 解析url编码的请求体
app.use(express.urlencoded({
    extended: true,
}))

app.use('/api/uploads', express.static('uploads'))

app.get(
    '/', (req: Request, res: Response) => {
        res.json({
            message: '欢迎使用express typescript api',
        })
    }
)

app.use('/api', routes)
