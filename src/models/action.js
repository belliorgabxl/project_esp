import mongoose, { Schema } from "mongoose";

const actionSchema = new Schema(
  {
   actionId:Number,
   actionType:String,
   actionDetail:String,
   status:String,
  },
  {
    timestamps: true,
  }
);

const Action = mongoose.models.Action || mongoose.model("Action", actionSchema);

export default Action;