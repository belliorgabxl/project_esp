import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
   messageId:Number,
   messageTopic:String,
   topicDetail:String,
   deviceId:String,
   status:String,
   actionId:Number
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;