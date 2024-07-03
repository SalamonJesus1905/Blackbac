import { Types } from "mongoose";
//create page
export interface RegisterData {
    body: {
        username: string,
        email: string,
        password: string,
        role_id: number,
        inviteToken: string;
    }
}
export interface ResponseData {
    status: (arg0: number) =>{send: (arg0: {data:ResData,permission:ResPermission}) => void},
}
//body data
export interface UserData {
    username: string,
    email: string,
    password: string,
    role_id: number,
    inviteToken: string;
}

export interface ResData {
    _id: Types.ObjectId,
    username: string,
    email: string,
    password: string,
    role_id: number,
    token: string | null,
    inviteToken: string | null,
    inviteTokenVerified: number,
    createdAt: Date,
    updatedAt: Date | null,
}

export interface ResPermission {
    _id: Types.ObjectId,
    user_id: Types.ObjectId,
    role_create: number,
    role_update: number,
    role_read: number,
    role_delete: number,
    createdAt: Date,
    updatedAt: Date | null,
}

// login page

export interface UserLoginBody{
    body:{
        email:string,
        password:string,
    }
}

export interface UserResData{
    status: (arg0:number) =>{send:(arg0: {message: string,data: ResData} | string )=>void }

}

export interface LoginGetData {
    _id: Types.ObjectId,
    username: string,
    email: string,
    password: string,
    role_id: number,
    
}