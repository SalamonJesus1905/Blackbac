import mongoose from "mongoose";
import validator from "validator";
const organizationSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Auth"
    },
    customerId:{
        type: String,
        unique: true,
        default:null
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
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
    phoneNo:{
        type:String,
        required:true,
        validate(value:string){
            if(!validator.isMobilePhone(value)){
                throw new Error("Invalid phone number")
            }
        }
    },
    mobileNo:{
        type:String,
        // validate(value:string){
        //     if(!validator.isMobilePhone(value, /[0-9]{3}-[0-9]{3}-[0-9]{4}/)){
        //         throw new Error("Invalid phone number")
        //     }
        // }
    },
    companyName:{
        type:String,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    addressLine1:{
        type:String,
        required:true
    },
    addressLine2:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:true
    },
    continent:{
        type:String,
        required:true
    },
    postCode:{
        type:Number,
        required:true
    },
    status:{
        type: Boolean,
        required: true,
        enum: ['Active', 'Inactive']
    }

},{
    timestamps: true
})

const Organization = mongoose.model('Organization', organizationSchema)

export default Organization;