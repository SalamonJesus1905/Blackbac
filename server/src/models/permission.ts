import mongoose from "mongoose";
const permissionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role_create:{
        type:Number,
        enum: [0,1],
        default: 0
    },
    role_update:{
        type:Number,
        enum: [0,1],
        default: 0
    },
    role_read:{
        type:Number,
        enum: [0,1],
        default: 0
    },
    role_delete:{
        type:Number,
        enum: [0,1],
        default: 0
    }
},{
    timestamps:true
})

const Permission = mongoose.model('permission',permissionSchema)
export default Permission