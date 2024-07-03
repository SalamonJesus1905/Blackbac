import Auth from "../models/auth"
const roleAdmin = async(req:any, res:any, next:any): Promise<void>=>{
    const token:string = req.headers.authorization.replace('Bearer','').trim()
    const data:any = await Auth.findOne({token})
    if(data !== null && data.role_id === 1){
        next()
    }
    else{
        res.status(500).send("unauthorized access")
    }
}

export default {
    roleAdmin,
}