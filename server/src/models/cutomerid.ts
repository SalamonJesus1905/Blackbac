import mongoose from "mongoose";
const customToken = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Auth"
    },
    customId: {
        type: String,
        required: true,
        unique: true
    },
    idUsed:{
        type: Number,
        default: 1,
    }
},{
    timestamps: true,
})

const CustomId = mongoose.model('CustomToken', customToken)

export default CustomId