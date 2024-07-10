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
    role:{
        type: String,
        enum:["SUPER_ADMIN","SUB_ADMIN","CUSTOMER_ADMIN","USER"],
        required:true,
        default: "USER"
    },
    inviteTokenVerified:{
        type:Number,
        default: 1
    },
    custom_Id:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    }
},{
    timestamps:true
})


authSchema.pre('save', async function(next){
    let user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
        next()
    }
})

const  Auth = mongoose.model("Auth", authSchema)

export default Auth;

