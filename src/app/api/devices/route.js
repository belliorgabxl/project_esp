import connectMongoDB from "../../../lib/mongodb";
import Device from "../../../models/device"
import { NextResponse } from "next/server";



export async function POST(request) {
  const { 
    deviceId,
    deviceName,
    devicePath,
    deviceType,
    deviceOwner,
    productPassword,
    productId,
    status,
    wifiId,
    wifiConnect,
    description,
    actionId
   } = await request.json();
  await connectMongoDB();
  await Device.create({
    deviceId,
    deviceName,
    devicePath,
    deviceType,
    deviceOwner,
    productPassword,
    productId,
    status,
    wifiId,
    wifiConnect,
    description,
    actionId
   });
  return NextResponse.json({ message: "Device Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const devices = await Device.find();
  return NextResponse.json(devices );
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Device.findByIdAndDelete(id);
  return NextResponse.json({ message: "Device deleted" }, { status: 200 });
}
// try {
//   const res = await fetch("http://localhost:3000/api/topics", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ title, description }),
//   });

//   if (res.ok) {
//     router.push("/");
//   } else {
//     throw new Error("Failed to create a topic");
//   }
// } catch (error) {
//   console.log(error);
// }
// };