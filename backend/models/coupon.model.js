import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
   dicountPercentage: {
      type: Number,
      required: true,
      min:0,
      max:100,
    },
    expirationDate: {
      type: Date,
      required: true,
      
    },
    isActive: {
        type: Boolean,
        default: true,
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true,
        unique:true,
    },
      
    
  },
  {
    timestamps: true,
  }
);
const Coupon =  mongoose.model("Coupon", couponSchema);

export default Coupon;