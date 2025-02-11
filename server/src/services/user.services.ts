import Auth from "../models/auth"
import Token from "../models/token"

const create = async (data: any) => {
    const newUser = await Auth.create(data)
    return newUser
}

const inviteTokenCreate = async (data: any)=>{
    const inviteToken = await Token.create(data)
    return inviteToken
}

const getData = async (data: any) => {
    const newUser = await Auth.findOne({ email: data})
    return newUser
}

const getDataToken = async (data: any) => {
    const newUser = await Auth.findOne({ inviteToken: data})
    return newUser
}

const customerIdGeneration = async () => {
    const prefix = "CAR";
    const customNumber = Math.floor(10000 + Math.random() * 900000)
    const customerId = prefix + customNumber
    return customerId
}


export default {
    create, getData, getDataToken, inviteTokenCreate, customerIdGeneration
}