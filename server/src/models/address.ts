import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
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
    postalcode:{
        type:Number,
        required:true
    }
},
{
    timestamps: true,
})

const Address = mongoose.model('Address', addressSchema)

export default Address;