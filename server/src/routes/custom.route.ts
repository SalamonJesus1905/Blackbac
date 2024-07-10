import express from 'express';
import controllers from '../controllers/index';
import roleValidation from '../middleware/role.validation';
import tokenValidation from '../middleware/token.validation';
const router: any = express.Router()

router.get('/index', [tokenValidation.validToken, roleValidation.roleCustom], controllers.customController.index)
router.put('/activateOrg/:id', [tokenValidation.validToken, roleValidation.roleCustom], controllers.customController.orgActivation)
router.post('/userCreate', [tokenValidation.validToken, roleValidation.roleCustom], controllers.customController.userCreation)
router.get('/userView', [tokenValidation.validToken, roleValidation.roleCustom], controllers.customController.getUsers)
router.put('/userUpdate/:id', [tokenValidation.validToken, roleValidation.roleCustom], controllers.customController.updateUser)
router.delete('/userDelete/:id', [tokenValidation.validToken, roleValidation.roleCustom], controllers.customController.deleteUser)

export default router;