import express from 'express';
import controllers from '../controllers/index';
import roleValidation from '../middleware/role.validation';
import tokenValidation from '../middleware/token.validation';
const router: any = express.Router()

router.get('/index', [roleValidation.roleUser, tokenValidation.validToken], controllers.userController.index)

export default router