import catchAsync from "../utils/catchAsync";
import services from "../services/index"
import bcrypt from 'bcrypt';
import { AnyArray } from "mongoose";
const register = catchAsync(async (req: { body: any }, res: any): Promise<void> => {
    let userData: any = req.body
    const inviteToken = services.tokenServices.inviteTokenGenearation(req.body.email)
    userData.inviteToken = inviteToken
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
    if(data.inviteTokenVerified === 1){
        res.status(200).send("Kindly set your password")
    }
    if (data.token == null && data.inviteTokenVerified === 0) {
        const token = services.tokenServices.generateToken(req.body)
        if (token == null) {
            throw new Error("Invalid token")
        }
        await bcrypt.compare(req.body.password, data.password)
        data.token = token
        await data.save()
        res.status(200).send({ message: "welcome to the index page", data })
    }

    const tokenTime: any = services.tokenServices.validToken(data.token)
    if (tokenTime === false && data.inviteTokenVerified === 0 ) {
        console.log("bro2")
        const token = services.tokenServices.generateToken(req.body)
        await bcrypt.compare(req.body.password, data.password)
        data.token = token
        await data.save()
        res.status(200).send(data)
    }
    if (tokenTime === true && data.inviteTokenVerified === 0 ) {
        res.status(200).send({ message: "user already loggedin", data })
    }
})

const forgetPassword = async (req: any, res: any) => {
    const user:any = await services.userServices.getData(req.body.email)
    if(user !== null){
        const inviteToken = services.tokenServices.inviteTokenGenearation(JSON.stringify(user._id))
        user.inviteToken = inviteToken
        const data = await user.save()
        await services.mailServices.resetPassword(data)
        res.send({message: "mail sent!", Token:inviteToken, user})
    }
}
const resetPasswordPage = (req:any, res:any) =>{
    const inviteToken = req.params.token
    res.send({inviteToken,message:"reset password fields"})
}

const resetPassword = async (req: any, res: any, next:any) => {
    const user:any = await services.userServices.getDataToken(req.params.token)
    if(user !== null){
        user.password = req.body.password
        const data = await user.save()
        res.send({message: "password reset successfully!", data})
    }
    next()
}


const Adminindex = (req: any, res: any) => {
    res.status(200).send("welcome to the Admin panel")
}

export default {
    register, login, Adminindex, forgetPassword, resetPassword, resetPasswordPage
}