import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productId:String,
    productPassword:String,
    productType:String,
    productPath:String,
    status:String
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;