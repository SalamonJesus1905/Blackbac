import Token from "../models/token"
const roleAdmin = async (req: any, res: any, next: any): Promise<void> => {
    const token: string = req.headers.authorization.replace('Bearer', '').trim()
    const data: any = await Token.findOne({ token }).populate("user_id")
    if (data !== null && data.user_id.role === "SUPER_ADMIN") {
        next()
    }
    else {
        res.status(500).send("unauthorized access")
    }
}

const roleSubAdmin = async (req: any, res: any, next: any): Promise<void> => {
    const token: string = req.headers.authorization.replace('Bearer', '').trim()
    const data: any = await Token.findOne({ token }).populate("user_id")
    if (data !== null && data.user_id.role === "SUB_ADMIN") {
        next()
    }
    else {
        res.status(500).send("unauthorized access")
    }
}

const roleCustom = async (req: any, res: any, next: any): Promise<void> => {
    const token: string = req.headers.authorization.replace('Bearer', '').trim()
    const data: any = await Token.findOne({ token }).populate("user_id")
    if (data !== null && data.user_id.role === "CUSTOMER_ADMIN") {
        next()
    }
    else {
        res.status(500).send("unauthorized access")
    }
}

const roleUser = async (req: any, res: any, next: any): Promise<void> => {
    const token: string = req.headers.authorization.replace('Bearer', '').trim()
    const data: any = await Token.findOne({ token }).populate("user_id")
    if (data !== null && data.user_id.role === "USER") {
        next()
    }
    else {
        res.status(500).send("unauthorized access")
    }
}

export default {
    roleAdmin, roleSubAdmin, roleCustom, roleUser
}