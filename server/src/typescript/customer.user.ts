import { ObjectId } from "mongoose"

export interface UserBodyValid {
    error: unknown,
    value: {
        username: string,
        email: string,
        password: string,
        role: string,
        address: object
    }
}
export interface UserAddressValid {
    error: unknown,
    value: {
        user_id: ObjectId,
        address1: string,
        address2: string,
        city: string,
        country: string,
        postalcode: number
    }
}

export interface UserCreateResponse {
    _id: any,
    username: string,
    email: string,
    password: string,
    role: string,
    custom_Id:ObjectId,
    inviteTokenVerified:number,
    createdAt: Date,
    updatedAt: Date | null,
}

export interface TokenDetails{
    _id: ObjectId,
    user_id: ObjectId,
    token: string,
    inviteToken: string,
    createdAt: Date,
    updatedAt: Date | null,
}

export interface TokenPopUser{
    _id: ObjectId,
    user_id: {
        _id: ObjectId,
        username: string,
        email: string,
        password: string,
        role: string,
        inviteTokenVerified: number,
        createdAt: Date,
        updatedAt: Date | null,
    },
    token: string | null,
    inviteToken: string,
    resetToken: string | null,
    createdAt: Date,
    updatedAt: Date | null,
}