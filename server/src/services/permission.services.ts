import Permission from "../models/permission.ts";
const create = async (data: any) => {
    const userPermissions = await Permission.create({user_id:data})
    return userPermissions
}

export default {
    create,
}