import connectMongoDB from "@/lib/mongodb";
import Device from "@/models/device"
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  const devices = await Device.findOne({ deviceId: id });

  return NextResponse.json( devices, { status: 200 });
}

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Topic.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }

