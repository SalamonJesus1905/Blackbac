import Role from "../models/role.ts";
const create = async (req: { body: any }, res:any):Promise<void>=>{
    const data:any =  await Role.create(req.body)
    res.status(200).send(data)  
}

export default {
    create,
}