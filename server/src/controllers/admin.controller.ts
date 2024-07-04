import Auth from "../models/auth";
import Permission from "../models/permission";
import catchAsync from "../utils/catchAsync";
import authValidation from "../middleware/auth.validation";
import services from "../services/index";
import bcrypt from "bcrypt";
import Token from "../models/token";
const create = catchAsync(async (req: { body: any }, res: any) => {
    const data: any = authValidation.userCreation(req.body)
    if (data.error) {
        res.status(500).send({ message: data.error })
    }
    else {
        const inviteToken = services.tokenServices.inviteTokenGenearation(req.body)
        const newSubAdmin = await Auth.create(data.value)
        await Token.create({ user_id: newSubAdmin._id, inviteToken })
        const permission = await Permission.create({
            user_id: newSubAdmin._id,
            role_create: req.body.permission.role_create,
            role_update: req.body.permission.role_update,
            role_read: req.body.permission.role_read,
            role_delete: req.body.permission.role_delete,
        });
        const userData = await Token.findOne({ inviteToken }).populate("user_id");
        await services.mailServices.accountCreated(userData)
        res.status(200).send({ "data": userData, "permission": permission });
    }
})

const passwordSetup = catchAsync(async (req: any, res: any) => {
    const inviteVerified: any = await Token.findOne({ inviteToken: req.params.token }).populate("user_id")
    if (inviteVerified.user_id.inviteTokenVerified === 1) {
        const tokenValid: any = services.tokenServices.inviteTokenValidation(req.params.token)
        if (tokenValid === true) {
            await Auth.findOneAndUpdate({ email: inviteVerified.user_id.email }, { inviteTokenVerified: 0 })
            const data = await Token.findOne({ inviteToken: req.params.token }).populate('user_id')
            res.status(201).json({ message: "token validation successful", data })
        }
    } else {
        res.status(400).json({ message: "link already verified" })
    }
})

const passwordInitilize = catchAsync(async (req: any, res: any) => {
    const password = await bcrypt.hash(req.body.password, 10)
    const user: any = await Token.findOne({ inviteToken: req.params.token }).populate('user_id')
    await Auth.findOneAndUpdate({ email: user.user_id.email }, { password });
    const result = await Auth.findOne({ email: user.user_id.email })
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

const updateRecord = catchAsync(async (req: any, res: any): Promise<void> => {
    const idExist = await Auth.findById(req.params.id)
    if (idExist !== null) {
        const data = authValidation.userUpdation(req.body)
        const userPermission = authValidation.UpdationPermissionSchema(req.body.permission)
        await Auth.findByIdAndUpdate(req.params.id, data.value)
        await Permission.findOneAndUpdate({ user_id: req.params.id }, userPermission.value)
        const updateData = await Auth.findById(req.params.id)
        res.status(200).send({ message: "Data updated Successful", updateData })
    }
    res.status(500).send("Data not found")
});

const deleteRecord = catchAsync(async (req: any, res: any): Promise<void> => {
    const userData = await Auth.findById(req.params.id)
    if (userData !== null) {
        await Token.findOneAndDelete({ user_id: req.params.id })
        await Permission.findOneAndDelete({ user_id: req.params.id })
        await Auth.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Data deleted Successful" })
    }
    res.status(500).send({ message: "Data Not Found" })

});
export default {
    create, getSubUsers, getCustomUsers, getUsers, permission, passwordSetup, passwordInitilize, updateRecord, deleteRecord
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