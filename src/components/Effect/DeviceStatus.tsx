"use client";
import MqttContext from "@/app/connect/MqttContext";
import React, { useContext } from "react";

export default function DeviceStatus() {
  const { deviceStatus } = useContext(MqttContext);
  return (
    <div>
      {deviceStatus == "online" ? (
        <div className="px-6 flex gap-2 bg-gray-800 py-1 items-center rounded-2xl ">
          <div className="w-4 h-4 rounded-full bg-green-500    shadow-sm shadow-gray-800"></div>
          Online
        </div>
      ) : (
        <div className="px-6 flex gap-2 bg-gray-800 py-1 items-center rounded-2xl ">
          <div className="w-4  h-4 rounded-full bg-red-600 shadow-sm shadow-gray-800"></div>
          <div>
            Offline
            </div>
        </div>
      )}
    </div>
  );
}
