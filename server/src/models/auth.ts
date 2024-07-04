import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const authSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate(value:string){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    role_id:{
        type: Number,
        required:true,
        default: 4
    },
    // token:{
    //     type:String,
    //     default: null
    // },
    // inviteToken:{
    //     type:String,
    //     default: null,
    //     required:true
    // },
    inviteTokenVerified:{
        type:Number,
        default: 1
    }
},{
    timestamps:true
})


authSchema.pre('save', async function(next){
    let user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    }
})

const  Auth = mongoose.model("Auth", authSchema)

export default Auth;

