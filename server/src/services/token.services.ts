import jwt from "jsonwebtoken";
import config from "../config/config.ts";
const generateToken = (obj: any) => {
    const payload = obj
    const secret = config.jwt.secret;
    const options = { expiresIn: config.jwt.expiryTime * 60 };
    let token = jwt.sign(payload, secret, options);
    return token
}


const inviteTokenGenearation = (obj:any)=>{
    const payload = obj
    const secret = config.jwt.inviteSecret;
    let token = jwt.sign(payload, secret);
    return token
}

const inviteTokenValidation = (token:any)=>{
    const secret = config.jwt.inviteSecret;
    return jwt.verify(token, secret,(err:any, result:any)=>{
        if(err){
            return false
        }else{
            return true;
        }
        
    });;
    
}

const validToken = (token:any)=>{
    const secret = config.jwt.secret;
    return jwt.verify(token, secret,(err:any, result:any)=>{
        if(err){
            return false
        }else{
            return true;
        }
        
    });
}

export default {generateToken, validToken, inviteTokenGenearation, inviteTokenValidation};