import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Auth"
    },
    token: { 
        type:String,
        default:null,
    },
    inviteToken:{
        type:String,
        default:null,
    },
    resetToken:{
        type:String,
        default:null,
    }
},{
    timestamps:true
})

const Token = mongoose.model('Token', tokenSchema)
export default Token