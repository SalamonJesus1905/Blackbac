import express from 'express';
import authRoute from "./auth.route";
import adminRoute from "./admin.route";
import customRoute from "./custom.route";
import userRoute from "./user.route";

const router = express.Router()

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },{
        path: '/admin',
        route: adminRoute
    },{
        path: '/custom',
        route: customRoute
    },{
        path: '/user',
        route: userRoute
    }
]

defaultRoutes.forEach(route => {
    router.use(route.path, route.route)
})

export default router;