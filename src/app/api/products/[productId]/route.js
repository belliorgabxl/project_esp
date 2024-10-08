import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product"
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { productId } = params;
  await connectMongoDB();

  const products = await Product.findOne({ productId: productId });

  return NextResponse.json( products, { status: 200 });
}

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Topic.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }

