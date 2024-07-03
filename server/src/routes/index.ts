import express from 'express';
import authRoute from "./auth.route";
import roleRoute from "./role.route";
import adminRoute from "./admin.route";

const router = express.Router()

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/role',
        route: roleRoute
    },{
        path: '/admin',
        route: adminRoute
    }
]

defaultRoutes.forEach(route => {
    router.use(route.path, route.route)
})

export default router;