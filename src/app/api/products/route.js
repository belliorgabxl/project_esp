import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product"
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    productId,
    productPassword,
    productType,
    productPath,
    status
   } = await request.json();
  await connectMongoDB();
  await Product.create({
    productId,
    productPassword,
    productType,
    productPath,
    status
   });
  return NextResponse.json({ message: "Products Created" }, { status: 201 });
}
export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json(products);
}
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Products deleted" }, { status: 200 });
}