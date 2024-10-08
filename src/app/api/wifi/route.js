import connectMongoDB from "@/lib/mongodb";
import Wifi from "@/models/wifi"
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    wifiId,
    wifiName,
    wifiPassword,
    status,
    actionId

   } = await request.json();
  await connectMongoDB();
  await Wifi.create({
    wifiId,
    wifiName,
    wifiPassword,
    status,
    actionId
   });
  return NextResponse.json({ message: "Wi-fi Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const wifi = await Wifi.find();
  return NextResponse.json(wifi );
}


export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Wifi.findByIdAndDelete(id);
  return NextResponse.json({ message: "wifi deleted" }, { status: 200 });
}