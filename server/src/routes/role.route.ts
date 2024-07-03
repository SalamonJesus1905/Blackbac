import express from 'express';
import controllers from '../controllers/index';
const router:any = express.Router()

router.post('/create',controllers.roleController.create)

export default router;