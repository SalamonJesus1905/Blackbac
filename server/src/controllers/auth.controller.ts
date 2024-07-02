import catchAsync from "../utils/catchAsync.ts";
import services from "../services/index.ts"
import bcrypt from 'bcrypt';
const register = catchAsync(async (req: { body: any }, res: any): Promise<void> => {
    let userData: any = req.body
    const data: any = await services.userServices.create(userData)
    const permission: any = await services.permissionServices.create(data._id);
    res.status(200).send({ "data": data, "permission": permission });
})

const login = catchAsync(async (req: { body: any; }, res: {
    status(arg0: number): any; send: (arg0: any) => void;
}) => {
    const data: any = await services.userServices.getData(req.body.email)
    if (data == null) {
        res.status(200).send("Invalid email address or Password")
    }
    if (data.token == null && data.inviteTokenVerified === 0) {
        const token = services.tokenServices.generateToken(req.body)
        if (token == null) {
            throw new Error("Invalid token")
        }
        await bcrypt.compare(req.body.password, data.password)
        data.token = token
        data.save()
        res.status(200).send({message:"welcome to the index page",data})
    }

    const tokenTime: any = services.tokenServices.validToken(data.token)
    if (tokenTime === false) {
        const token = services.tokenServices.generateToken(req.body)
        await bcrypt.compare(req.body.password, data.password)
        data.token = token
        data.save()
        res.status(200).send(data)
    }
    if (tokenTime === true) {
        res.status(200).send({message:"user already loggedin",data})
    }
})





const Adminindex = (req: any, res: any) => {
    res.status(200).send("welcome to the Admin panel")
}

export default {
    register, login, Adminindex
}