import mongoose from "mongoose";

export const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB is Connected: ${conn.connection.host}`);
    } catch(error){
        console.log("Errror on MongoDB", error.message);
        process.exit(1);

    }
}