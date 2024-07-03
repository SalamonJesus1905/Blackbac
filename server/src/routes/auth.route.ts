import express from 'express';
import controllers from '../controllers/index.ts';
import schemaValidate from '../middleware/schema.validate.ts'
import authValidation from '../middleware/auth.validation.ts';
const router: any = express.Router()

router.post('/register', schemaValidate(authValidation.register), controllers.authController.register)
router.post('/login', schemaValidate(authValidation.login), controllers.authController.login)
router.get('/account/setup/:token', controllers.adminController.passwordSetup)
router.post('/account/setup/:token', controllers.adminController.passwordInitilize)

//forget password flow
router.get('/forgetpassword', controllers.authController.forgetPassword)
router.get('/resetpassword/:token', controllers.authController.resetPasswordPage)
router.post('/resetpassword/:token', controllers.authController.resetPassword)



export default router;