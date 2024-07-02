import express from 'express';
import controllers from '../controllers/index.ts';
const router:any = express.Router()

router.post('/create',controllers.roleController.create)

export default router;