"use client";
import mqtt, { MqttClient } from "mqtt";
import React, { useState } from "react";

type Props = {
  device_id: string;
  isLoading: boolean;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
  device_log: string;
  device_connect: boolean;
};
export default function PumpPanel({
  device_id,
  isLoading,
  client,
  isConnected,
  topic,
  device_log,
  device_connect,
}: Props) {
  return (
    <div
      className={`duration-1000 gap-2  ml-5 shadow-md shadow-gray-900 bg-gradient-to-tr px-5 w-full from-blue-950 to-gray-800 rounded-lg ${
        isLoading ? " py-5 " : "py-0"
      }`}
    >
      <div className={` ${isLoading ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="text-xl text-white my-1">Device Name</div>
        <p className="bg-gray-600 shadow-inner shadow-gray-950 text-center text-2xl font-semibold rounded-md text-white px-3 py-2">
          Auto Pump IoT
        </p>
      </div>
      <div className={`my-6 ${isLoading ? "animate-fadeIn " : "opacity-0"}`}>
        <span className="text-xl text-white my-1">Status : </span>
        {device_connect? (
          <span className="bg-gray-600 shadow-inner mx-3 shadow-gray-950 text-center  text-xl rounded-md text-green-400 font-bold px-10 py-2">
            Connected
          </span>
        ) : (
          <span className="bg-gray-600 shadow-inner mx-3 shadow-gray-950 text-center  text-xl rounded-md text-red-500 font-bold px-10 py-2">
            Disconnect
          </span>
        )}
      </div>
      <div className={`my-6 ${isLoading ? "animate-fadeIn " : "opacity-0"}`}>
        <span className="text-xl text-white">Topic :  </span>
        <span className="bg-gray-600 shadow-inner mx-3 shadow-gray-950 text-center  text-xl rounded-md text-white  px-10 py-2">
          {topic}
        </span>
      </div>
      <hr className={`my-4 ${isLoading ? "animate-fadeIn " : "opacity-0"}`} />
      <div className={`mb-6 ${isLoading ? "animate-fadeIn " : "opacity-0"}`}>
        <div className="text-xl text-white my-1">Device log</div>
        <div className="bg-gray border-2 shadow-inner flex shadow-gray-950  text-xl rounded-sm text-black font-semibold px-3 py-4 bg-gray-200 text-start">
          <p className=" duration-75 animate-pulse ">&gt;_&nbsp;&nbsp;&nbsp;</p>
          {device_log}
        </div>
      </div>
      <div className={` ${isLoading ? "animate-fadeIn " : "opacity-0"}`}>
        <div className="text-xl text-white my-1">Console log</div>
        <div className="bg-black border-2 shadow-inner flex shadow-gray-950  text-xl rounded-sm text-white px-3 pt-2 pb-10 text-start">
          <p className=" duration-75 animate-pulse ">&gt;_&nbsp;&nbsp;&nbsp;</p>
          {device_log}
        </div>
      </div>
    </div>
  );
}
