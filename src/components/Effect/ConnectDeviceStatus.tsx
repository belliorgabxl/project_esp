"use client";
import MqttContext from "@/app/connect/MqttContext";
import React, { useContext } from "react";

export default function ConnectDeviceStatus() {
  const { deviceStatus } = useContext(MqttContext);
  console.log(deviceStatus)
  return (
    <div>
      {deviceStatus == "online" ? (
        <div className="px-6 flex gap-2 text-white bg-gray-600 py-1 items-center rounded-2xl ">
          <div className="w-4 h-4 rounded-full bg-green-500    shadow-sm shadow-gray-800"></div>
          Connected
        </div>
      ) : (
        <div className="px-6 flex gap-2 text-white bg-gray-600 py-1 items-center rounded-2xl ">
          <div className="w-4  h-4 rounded-full bg-red-600 shadow-sm shadow-gray-800"></div>
          <div>
            Disconnected
            </div>
        </div>
      )}
    </div>
  );
}
