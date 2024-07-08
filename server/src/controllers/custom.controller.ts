import CustomId from "../models/cutomerid";
import Organization from "../models/organization";
import catchAsync from "../utils/catchAsync";

const index = catchAsync(async (req: any, res: any): Promise<void> => {
    res.send("welcome to the Custom admin dashboard")
})

const orgActivation = catchAsync(async (req: any, res: any): Promise<void> => {
    const customerId = req.body.customerId
    const tokenData:any = await CustomId.findOne({ customId: customerId })
    if (tokenData !== null && tokenData.isUsed === 1) {
        await Organization.findByIdAndUpdate("668bc9a777a4e6c98d76ac9c", { customerId, status: true })
        tokenData.idUsed = 0
        await tokenData.save()
        res.status(200).send({ message: "Organization activated Successful", status: true })
    }
    res.status(404).send({ message: "Invalid Customer Id" })

})

export default {
    index, orgActivation
};