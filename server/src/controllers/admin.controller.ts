import Auth from "../models/auth.ts";
import Permission from "../models/permission.ts";
import catchAsync from "../utils/catchAsync.ts";
import authValidation from "../middleware/auth.validation.ts";
import services from "../services/index.ts";
import bcrypt from "bcrypt";
const create = catchAsync(async (req: { body: any }, res: any) => {
    const data: any = authValidation.userCreation(req.body)
    if (data.error) {
        res.status(500).send({ message: data.error })
    }
    else {
        const inviteToken = services.tokenServices.inviteTokenGenearation(req.body._id)
        data.value.inviteToken = inviteToken
        const newSubAdmin = await Auth.create(data.value)
        const permission = await Permission.create({
            user_id: newSubAdmin._id,
            role_create: req.body.permission.role_create,
            role_update: req.body.permission.role_update,
            role_read: req.body.permission.role_read,
            role_delete: req.body.permission.role_delete,
        });
        await services.mailServices.accountCreated(data.value)
        res.status(200).send({ "data": newSubAdmin, "permission": permission });
    }
})

const passwordSetup = catchAsync(async (req: any, res: any) => {
    const inviteVerified: any = await Auth.findOne({ inviteToken: req.params.token })
    if (inviteVerified.inviteTokenVerified === 1) {
        const tokenValid: any = services.tokenServices.inviteTokenValidation(req.params.token)
        if (tokenValid === true) {
            await Auth.findOneAndUpdate({ inviteToken: req.params.token }, { inviteTokenVerified: 0 })
            const data = await Auth.findOne({ inviteToken: req.params.token })
            res.status(201).json({ message: "token validation successful", data })
        }
    } else {
        res.status(400).json({ message: "link already verified" })
    }
})

const passwordInitilize = catchAsync(async (req: any, res: any) => {
    const password = await bcrypt.hash(req.body.password, 10)
    await Auth.findOneAndUpdate({ inviteToken: req.params.token }, { password });
    const result = await Auth.findOne({ inviteToken: req.params.token })
    res.status(201).json({ message: "Password Successfully updated", result })
})

const getSubUsers = catchAsync(async (req: { body: any }, res: any): Promise<void> => {
    const data: any = await Auth.find({ role_id: 2 })
    res.status(200).json(data);
})

const getCustomUsers = catchAsync(async (req: { body: any }, res: any): Promise<void> => {
    const data: any = await Auth.find({ role_id: 3 })
    res.status(200).send(data);
})

const getUsers = catchAsync(async (req: { body: any }, res: any): Promise<void> => {
    const data: any = await Auth.find({ role_id: 4 })
    res.status(200).send(data);
})

const permission = catchAsync(async (req: {
    params: any; body: any
}, res: any): Promise<void> => {
    await Permission.findOneAndUpdate({ user_id: req.params.id }, req.body)
    const updateData: any = await Permission.findOne({ user_id: req.params.id })
    res.status(200).send(updateData);
})

export default {
    create, getSubUsers, getCustomUsers, getUsers, permission, passwordSetup, passwordInitilize
}

// let data = await Auth.aggregate([
//     {
//       $lookup: {
//         from: "permissions",
//         let: { u_id: "$_id" },
//         pipeline: [
//           {
//             $addFields: {
//               convertedId: { $toString: "$$u_id" }
//             }
//           },
//           {
//             $match: {
//               $expr: { $eq: ["$user_id", "$convertedId"] }
//             }
//           }
//         ],
//         as: "user_docs"
//       }
//     },
//     {
//         $project:{
//             _id: 1,
//             email: 1,
//             role_id: 1,
//             name: 1,
//             user_docs: { $arrayElemAt: ["$user_docs", 0] }
//         }
//     }
//   ]);