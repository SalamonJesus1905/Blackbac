import Token from "../models/token"
const roleAdmin = async(req:any, res:any, next:any): Promise<void>=>{
    const token:string = req.headers.authorization.replace('Bearer','').trim()
    const data:any = await Token.findOne({token}).populate("user_id")
    if(data !== null && data.user_id.role_id === 1){
        next()
    }
    else{
        res.status(500).send("unauthorized access")
    }
}

export default {
    roleAdmin,
}