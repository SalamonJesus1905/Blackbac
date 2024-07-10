import Auth from "../models/auth";
import Permission from "../models/permission";
import catchAsync from "../utils/catchAsync";
import authValidation from "../middleware/auth.validation";
import services from "../services/index";
import bcrypt from "bcrypt";
import Token from "../models/token";
import Address from "../models/address";
import Organization from "../models/organization";
import CustomId from "../models/cutomerid";

//subadmin controls
const createSubadmin = catchAsync(async (req: { body: any }, res: any) => {
    const data: any = authValidation.customCreation(req.body)
    const permission: any = authValidation.PermissionSchema(req.body.permission)
    const address: any = authValidation.addressSchema(req.body.address)
    if (data.error || permission.error || address.error) {
        res.status(500).send({ message: data.error || permission.error || address.error })
    }
    else {
        const inviteToken = services.tokenServices.inviteTokenGenearation({ "email": req.body.email })
        const newSubAdmin = await Auth.create(data.value)
        permission.value.user_id = newSubAdmin._id
        address.value.user_id = newSubAdmin._id
        await Token.create({ user_id: newSubAdmin._id, inviteToken })
        const userPermission = await Permission.create(permission.value);
        await Address.create(address.value);
        const userData = await Token.findOne({ inviteToken }).populate("user_id");
        await services.mailServices.accountCreated(userData)
        res.status(200).send({ "data": userData, "permission": userPermission });
    }
})

const getSubUsers = catchAsync(async (req: { body: any }, res: any): Promise<void> => {
    const data: any = await Auth.find({ role: "SUB_ADMIN" })
    res.status(200).json(data);
})

const updateSubadminRecord = catchAsync(async (req: any, res: any): Promise<void> => {
    const idExist = await Auth.findById(req.params.id)
    if (idExist !== null) {
        const data: any = authValidation.customUpdation(req.body)
        const address: any = authValidation.updateAddressSchema(req.body.address)
        const userPermission = authValidation.UpdationPermissionSchema(req.body.permission)
        await Auth.findByIdAndUpdate(req.params.id, data.value)
        await Permission.findOneAndUpdate({ user_id: req.params.id }, userPermission.value)
        await Address.findOneAndUpdate({ user_id: req.params.id }, address.value)
        const updateData = await Auth.findById(req.params.id)
        res.status(200).send({ message: "Data updated Successful", updateData })
    } else {
        res.status(500).send("Data not found")
    }
});

const deleteSubadminRecord = catchAsync(async (req: any, res: any): Promise<void> => {
    const userData = await Auth.findById(req.params.id)
    if (userData !== null) {
        await Token.findOneAndDelete({ user_id: req.params.id })
        await Permission.findOneAndDelete({ user_id: req.params.id })
        await Address.findOneAndDelete({ user_id: req.params.id })
        await Auth.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Data deleted Successful" })
    }
    else {
        res.status(500).send({ message: "Data Not Found" })
    }
});

// customer admin controls
const getCustomAdmin = catchAsync(async (req: { body: any }, res: any): Promise<void> => {
    const data: any = await Auth.find({ role: "CUSTOMER_ADMIN" })
    res.status(200).send(data);
})
const createCustomAdmin = catchAsync(async (req: any, res: any): Promise<void> => {
    const data: any = authValidation.customCreation(req.body)
    const permission: any = authValidation.PermissionSchema(req.body.permission)
    const address: any = authValidation.addressSchema(req.body.address)
    if (data.error || permission.error || address.error) {
        res.status(500).send({ message: data.error || permission.error || address.error })
    }
    else {
        const inviteToken = services.tokenServices.inviteTokenGenearation({ "email": data.value.email })
        const newCustomAdmin = await Auth.create(data.value)
        permission.value.user_id = newCustomAdmin._id
        address.value.user_id = newCustomAdmin._id
        await Token.create({ user_id: newCustomAdmin._id, inviteToken })
        await Permission.create(permission.value);
        await Address.create(address.value);
        const userData: any = await Token.findOne({ inviteToken }).populate("user_id");
        await services.mailServices.accountCreated(userData)
        res.status(200).send({ message: "CustomerAdmin accout Successfully created", userData });
    }
})

const updateCustomAdmin = catchAsync(async (req: any, res: any): Promise<void> => {
    const idExist = await Auth.findById(req.params.id)
    if (idExist !== null) {
        const data: any = authValidation.customUpdation(req.body)
        const permission: any = authValidation.PermissionSchema(req.body.permission)
        const address: any = authValidation.updateAddressSchema(req.body.address)
        if (data.error || permission.error || address.error) {
            res.status(500).send({ message: data.error || permission.error || address.error })
        }
        else {
            await Auth.findByIdAndUpdate(req.params.id, data.value)
            await Permission.findOneAndUpdate({ user_id: req.params.id }, permission.value)
            await Address.findOneAndUpdate({ user_id: req.params.id }, address.value)
            res.status(201).send({ message: "CustomerAdmin account Successfully updated" });
        }
    } else {
        res.status(500).send({ message: "Data Not Found" });
    }
})


const deleteCustomAdmin = catchAsync(async (req: any, res: any): Promise<void> => {
    const userData = await Auth.findById(req.params.id)
    if (userData !== null) {
        await Token.findOneAndDelete({ user_id: req.params.id })
        await Permission.findOneAndDelete({ user_id: req.params.id })
        await Address.findOneAndDelete({ user_id: req.params.id })
        await Auth.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Custom Admin Data deleted Successful" })
    } else {
        res.status(500).send({ message: "Data Not Found" })
    }
});
//users controls
const getUsers = catchAsync(async (req: { body: any }, res: any): Promise<void> => {
    const data: any = await Auth.find({ role: "USER" })
    res.status(200).send(data);
})



const permission = catchAsync(async (req: {
    params: any; body: any
}, res: any): Promise<void> => {
    await Permission.findOneAndUpdate({ user_id: req.params.id }, req.body)
    const updateData: any = await Permission.findOne({ user_id: req.params.id })
    res.status(200).send(updateData);
})

//password setup 
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

const createOrganization = catchAsync(async (req: any, res: any) => {
    const user = await Auth.findById(req.params.id)
    if (user !== null && user.inviteTokenVerified === 0) {
        const data: any = authValidation.organizationSchema(req.body)
        if (data.error) {
            res.status(500).send({ message: data.error.message })
        }
        const customerId = await services.userServices.customerIdGeneration()
        data.value.user_id = req.params.id
        const organization = await Organization.create(data.value)
        await CustomId.create({
            user_id: req.params.id,
            customId:customerId
        })
        const mailStatus = services.mailServices.organizationCreated(data.value, customerId)
        res.status(200).send({mailStatus:mailStatus ,message: "Organization created Successful",data: organization})
    } else {
        res.status(500).send({ message: "user status inactive" })
    }
})

export default {
    createSubadmin, getSubUsers, getCustomAdmin, getUsers, permission,
    passwordSetup, passwordInitilize, updateSubadminRecord, deleteSubadminRecord,
    createCustomAdmin, updateCustomAdmin, deleteCustomAdmin, createOrganization
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