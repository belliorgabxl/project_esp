import mongoose, { Schema } from "mongoose";

const deviceSchema = new Schema(
  {
    deviceId:String,
    deviceName:String,
    devicePath:String,
    deviceType:String,
    deviceOwner:String,
    productPassword:String,
    productId:Number,
    status:String,
    wifiId:String,
    wifiConnect:String,
    description:String,
    actionId:Number
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.models.Device || mongoose.model("Device", deviceSchema);

export default Device;