import {Router, RequestHandler} from 'express'
import { UserController } from '../controllers/user.controller'

const router = Router()
const userController = new UserController()

router.use(protect as unknown as RequestHandler)
