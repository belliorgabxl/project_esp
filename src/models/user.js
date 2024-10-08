import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
   userId:String , 
   userName:String,
   email:String,
   password:String,
   photos:Array,
   status:String,
   deviceId:Number,
   totalDevice:Number,
   actionId:Number
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;