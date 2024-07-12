import express from 'express';
import controllers from '../controllers/index';
import roleValidation from '../middleware/role.validation';
import tokenValidation from '../middleware/token.validation';
const router: any = express.Router()

//admin index
router.get('/index', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.authController.Adminindex)
//admin subAdmin creation page
router.post('/create', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.createSubadmin)
router.get('/subAdminView', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.getSubUsers)
router.put('/subAdminupdate/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.updateSubadminRecord)
router.delete('/subAdmindelete/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.deleteSubadminRecord)

//customer admin page 
router.get('/custom', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.getCustomAdmin)
router.post('/createCustom', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.createCustomAdmin)
router.put('/updateCustom/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.updateCustomAdmin)
router.delete('/deleteCustom/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.deleteCustomAdmin)
router.post('/organization/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.createOrganization)

//admin users view page

router.get('/users', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.getUsers)

//admin permissions assigning page
router.put('/permission/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.permission)


//admin Email Template Management
router.get('/emailTemplatesViews', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.emailTemplatesViews)
router.post('/emailTemplatesCreate', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.emailTemplatesCreate)
router.put('/emailTemplatesUpdate/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.emailTemplatesUpdate)
router.delete('/emailTemplatesDelete/:id', [tokenValidation.validToken, roleValidation.roleAdmin], controllers.adminController.emailTemplatesDelete)


export default router;