import Auth from "../models/auth.ts"

const create = async(data: any)=>{
    const newUser = await Auth.create(data)
    return newUser
}

const getData = async(data: any)=>{
    const newUser = await Auth.findOne({ email: data})
    return newUser
}

const getDataToken = async(data: any)=>{
    const newUser = await Auth.findOne({ inviteToken: data})
    return newUser
}


export default {
    create, getData, getDataToken
}