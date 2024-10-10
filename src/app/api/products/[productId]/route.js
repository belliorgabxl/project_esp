import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product"
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { productId } = params;
  await connectMongoDB();

  const products = await Product.findOne({ productId: productId });

  return NextResponse.json( products, { status: 200 });
}

export async function PUT(request, { params }) {
  const { productId } = params;
  const { newStatus: status} = await request.json();
  await connectMongoDB();
  await Product.findOneAndUpdate({productId:productId} , {status});
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

