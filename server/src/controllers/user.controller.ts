import catchAsync from "../utils/catchAsync";

const index = catchAsync(async (req:any, res:any) => {
    res.status(200).send("welcome to the user index");
})

export default{ index }