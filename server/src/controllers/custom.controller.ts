import CustomId from "../models/cutomerid";
import Organization from "../models/organization";
import catchAsync from "../utils/catchAsync";

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

export default {
    index, orgActivation
};