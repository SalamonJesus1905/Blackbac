import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    role_id: {
        type:Number,
        unique:true,
        required:true
    },
    role: {
        type:String,
        enum:["SUPER_ADMIN","SUB_ADMIN","CUSTOMER_ADMIN","USER"],
        required:true,
    }
},{
    timestamps:true
})

const Role = mongoose.model('Role', roleSchema);
export default Role;