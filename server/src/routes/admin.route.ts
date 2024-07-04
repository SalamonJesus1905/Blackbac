import express from 'express';
import controllers from '../controllers/index';
import roleValidation from '../middleware/role.validation';
import tokenValidation from '../middleware/token.validation';
const router: any = express.Router()

//admin index
router.get('/index', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.authController.Adminindex)
//admin user creation page
router.post('/create', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.create)
//admin users view page
router.get('/sub-admin', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.getSubUsers)
router.get('/custom-admin', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.getCustomUsers)
router.get('/users', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.getUsers)
//admin permissions assigning page
router.put('/permission/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.permission)

router.put('/update/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.update)
export default router;