import mongoose from "mongoose";
const templateSchema =  new mongoose.Schema({
    templateName:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    contentInitial:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    footerContent:{
        type:String,
        required:true
    },
    footer:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const Email = mongoose.model('emailTemplate',templateSchema)

export default Email;