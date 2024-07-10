import authValidation from "../middleware/auth.validation";
import Address from "../models/address";
import Auth from "../models/auth";
import Token from "../models/token";
import CustomId from "../models/cutomerid";
import Organization from "../models/organization";
import services from "../services";
import catchAsync from "../utils/catchAsync";
import { UserBodyValid, UserAddressValid, UserCreateResponse, TokenDetails, TokenPopUser } from "../typescript/customer.user";

const index = catchAsync(async (req: any, res: any): Promise<void> => {
    res.send("welcome to the Custom admin dashboard")
})

const orgActivation = catchAsync(async (req: any, res: any): Promise<void> => {
    const customerId = req.body.customerId
    const orgData: any = await Organization.findById(req.params.id)
    const custom = await CustomId.findOne({ customId: customerId })
    if (custom) {
        if (orgData !== null && orgData.customerId === null) {
            orgData.status = true
            orgData.customerId = customerId
            await orgData.save()
            await CustomId.findOneAndUpdate({ customId: customerId }, { idUsed: 0 })
            res.status(200).send({ message: "Organization activated Successful", status: true })
        }
        else {
            res.status(404).send({ message: "Organization already activated" })
        }
    }
    else {
        res.status(404).send({ message: "Invalid Customer Id" })
    }

})


const userCreation = catchAsync(async (req: any, res: any) => {
    const user: UserBodyValid = authValidation.customCreation(req.body)
    const address: UserAddressValid = authValidation.addressSchema(req.body.address)
    if (user.error || address.error) {
        res.status(500).send({ message: user.error || address.error })
    } else {
        const inviteToken: string = services.tokenServices.inviteTokenGenearation({ "email": user.value.email })
        const data: any = await Auth.create(user.value)
        await Token.create({ user_id: data._id, inviteToken })
        address.value.user_id = data._id
        await Address.create(address.value)
        const custToken: string = req.headers.authorization.replace('Bearer', '').trim();
        const customAD: TokenDetails | null = await Token.findOne({ token: custToken })
        if (customAD) {
            data.custom_Id = customAD.user_id
            await data.save()
            const userData: TokenPopUser | any  = await Token.findOne({ inviteToken }).populate("user_id");
            await services.mailServices.accountCreated(userData)
            res.status(200).send({ message: "User Account Creaated Successfully", mail: "Invite Mail Sent", data: userData })
        }

    }
})

const getUsers = catchAsync(async (req: { body: any, headers:any }, res: any): Promise<void> => {
    const userToken = req.headers.authorization.replace('Bearer', '').trim();
    const AdData:any =  await Token.findOne({token: userToken})
    const data: any = await Auth.find({ role: "USER", custom_Id : AdData.user_id })
    if (data) {
        res.status(200).send(data);
    } else {
        res.status(200).send({ message: "No users found" });
    }
})

const updateUser = catchAsync(async (req: any, res: any): Promise<void> => {
    const userData = authValidation.customUpdation(req.body)
    const address = authValidation.updateAddressSchema(req.body.address)
    if (userData.error || address.error) {
        res.status(500).send({ message: userData.error || address.error })
    } else {
        await Auth.findByIdAndUpdate(req.params.id, userData.value)
        await Address.findOneAndUpdate({ user_id: req.params.id }, address.value)
        res.status(201).send({ message: "user data updated successfully" })
    }

})

const deleteUser = catchAsync(async (req: any, res: any): Promise<void> => {
    const data = await Auth.findById(req.params.id)
    if (data) {
        await Auth.findByIdAndDelete(req.params.id)
        await Address.findOneAndDelete({ user_id: req.params.id })
        await Token.findOneAndDelete({ user_id: req.params.id })
        res.status(200).send({ message: "user data delete unsuccessful" })
    } else {
        res.status(500).send({ message: "user not found" })
    }

})

export default {
    index, orgActivation, userCreation, getUsers, updateUser, deleteUser
};