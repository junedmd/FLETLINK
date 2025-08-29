import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectMongoDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if(connect){
            console.log(" Database is connected to the server")
        }
    }catch(error){
        console.error('MongoDB connection failed:', error.message);
    process.exit(1);
    }
}
connectMongoDB();

export default connectMongoDB;