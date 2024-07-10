import catchAsync from "../utils/catchAsync";
import services from "../services/index"
import bcrypt from 'bcrypt';
import Token from "../models/token";
import Auth from "../models/auth";
import Permission from "../models/permission";
const register = catchAsync(async (req: { body: any }, res: any): Promise<void> => {
    let userData: any = {}
    const inviteToken = services.tokenServices.inviteTokenGenearation(req.body.email)
    const data: any = await services.userServices.create(req.body)
    userData.user_id = data._id
    userData.inviteToken = inviteToken
    await Token.create(userData)
    await services.permissionServices.create(data._id);
    res.status(200).send({ meassage: "account created successfully", data });
})

const login = catchAsync(async (req: { body: any; }, res: {
    status(arg0: number): any; send: (arg0: any) => void;
}) => {
    const data: any = await services.userServices.getData(req.body.email)
    const dcrypt = await bcrypt.compare(req.body.password, data.password)
    if (dcrypt === true) {
        const tokenDetails: any = await Token.findOne({ user_id: data._id }).populate("user_id")
        if (data !== null) {
            if (data.inviteTokenVerified === 1) {
                res.status(200).send("Kindly set your password")
            }
            if (tokenDetails.token == null && data.inviteTokenVerified === 0) {
                const token = services.tokenServices.generateToken({ "email": req.body.email })
                if (token == null) {
                    throw new Error("Invalid token")
                }
                else {
                    tokenDetails.token = token
                    await tokenDetails.save()
                    const userData: any = await Token.findOne({ token }).populate("user_id")
                    const userper = await Permission.findOne({ user_id: userData.user_id._id })
                    res.status(200).send({ message: "welcome to the index page", userData, userpermission: userper })
                }   
            }
            if(tokenDetails.token){
                const tokenTime: any = services.tokenServices.validToken(tokenDetails.token)
                if (tokenTime === true && data.inviteTokenVerified === 0) {
                    const userper = await Permission.findOne({ user_id: data._id })
                    res.status(200).send({ message: "user already loggedin", data, userpermission: userper })
                }
                if (tokenTime === false && data.inviteTokenVerified === 0) {
                    const token = services.tokenServices.generateToken({ "email": req.body.email })
                    tokenDetails.token = token
                    await tokenDetails.save()
                    res.status(200).send({ "data": tokenDetails })
                }
            }
        } else {
            res.status(500).send("Invalid email address")
        }
    } else {
        res.status(500).send({ message: "invalid password" })
    }
})

const forgetPassword = async (req: any, res: any) => {
    const user: any = await services.userServices.getData(req.body.email)
    if (user !== null) {
        const resetToken = services.tokenServices.resetTokenGeneration(req.body)
        await Token.findOneAndUpdate({ user_id: user._id }, { resetToken })
        const userData = await Token.findOne({ resetToken }).populate("user_id")
        await services.mailServices.resetPassword(userData)
        res.status(200).send({ message: "mail sent!", userData })
    }
}
const resetPasswordPage = (req: any, res: any) => {
    const resetToken = req.params.token
    res.status(200).send({ resetToken, message: "reset password fields" })
}

const resetPassword = async (req: any, res: any, next: any) => {

    const user: any = await Token.findOne({ resetToken: req.params.token }).populate("user_id")
    if (user !== null) {
        const hashedPassword: any = await bcrypt.hash(req.body.password, 10)
        await Auth.findOneAndUpdate({ email: user.user_id.email }, { password: hashedPassword })
        await Token.findOneAndUpdate({ resetToken: req.params.token }, { resetToken: null })
        const data = await Auth.findOne({ email: user.user_id.email })
        res.status(201).send({ message: "password reset successfully!", data })
    }
}


const Adminindex = (req: any, res: any) => {
    res.status(200).send("welcome to the Admin panel")
}

export default {
    register, login, Adminindex, forgetPassword, resetPassword, resetPasswordPage
}