import config from "../config/config.ts"
import jwt from "jsonwebtoken";
const validToken = (req:any, res:any, next:any) => {
    const userToken = req.headers.authorization.replace('Bearer','').trim();
    const secret = config.jwt.secret;
    jwt.verify(userToken, secret,(err:any, result:any)=>{
        if(err){
            res.status(500).send(err.message)
        }else{
        next()
        }
    });
}

export default {validToken};