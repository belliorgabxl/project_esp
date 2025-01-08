"use client";
import MqttContext from "@/app/connect/MqttContext";
import React, { useContext } from "react";

export default function ConnectBrokerStatus() {
  const { connectionStatus } = useContext(MqttContext);
  return (
    <div>
      {connectionStatus == "Connected" ? (
        <div className="px-6 flex gap-2 bg-gray-600 text-white py-1 items-center rounded-2xl ">
          <div className="w-4 h-4 rounded-full bg-green-500    shadow-sm shadow-gray-800"></div>
          Connected
        </div>
      ): connectionStatus == "Reconnecting" ? (
        <div className="px-6 flex gap-2 bg-gray-600 py-1 text-white items-center rounded-2xl ">
          <div className="w-4 h-4 rounded-full bg-yellow   shadow-sm shadow-gray-800"></div>
          Reconnected..
        </div>
      ) : (
        <div className="px-6 flex gap-2 bg-gray-600 text-white py-1 items-center rounded-2xl ">
          <div className="w-4  h-4 rounded-full bg-red-600 shadow-sm shadow-gray-800"></div>
          <div>
            DisConnected
            </div>
        </div>
      )}
    </div>
  );
}
