import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";

const superDB = ():void =>{
     mongoose.connect('mongodb://localhost:27017/blubase').then(() =>{
        app.listen(8000, ()=>{
            console.log(`Server running on port ${config.port}`)
        })
    })
}

superDB()

export default superDB;