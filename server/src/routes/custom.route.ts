import express from 'express';
import controllers from '../controllers/index';
import roleValidation from '../middleware/role.validation';
import tokenValidation from '../middleware/token.validation';
const router: any = express.Router()

router.get('/index', [tokenValidation.validToken, roleValidation.roleCustom], controllers.customController.index)
router.put('/activateOrg/:id', [tokenValidation.validToken, roleValidation.roleCustom], controllers.customController.orgActivation)

export default router;