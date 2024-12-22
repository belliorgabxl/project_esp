"use client";
import mqtt, { MqttClient } from "mqtt";
import React, { useState } from "react";

type Props = {
  device_id: string;
  isLoading: boolean;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string | null;
  device_log: string;
  device_connect: boolean;
};

export default function ArmPanel({
  isLoading,
  topic,
  device_log,
  device_connect,
}: Props) {
  return (
    <div
      className={`duration-1000  ml-5 shadow-md shadow-gray-900 bg-gradient-to-tr px-5 w-full from-blue-950 to-gray-800 rounded-lg ${
        isLoading ? " py-5 " : "py-0"
      }`}
    >
      <div className={` ${isLoading ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="text-xl text-white my-1">Device Name</div>
        <p className="bg-gray-600 shadow-inner shadow-gray-950 text-center text-xl rounded-md text-white px-3 py-2">
          {topic}
        </p>
      </div>
      <div className={` ${isLoading ? "animate-fadeIn my-4" : "opacity-0"}`}>
        <span className="text-xl text-white my-1">Status : </span>
        {device_connect == true ? (
          <span className="bg-gray-600 shadow-inner mx-3 shadow-gray-950 text-center  text-xl rounded-md text-green-500 font-bold px-10 py-2">
            Connected
          </span>
        ) : (
          <span className="bg-gray-600 shadow-inner mx-3 shadow-gray-950 text-center  text-xl rounded-md text-red-500 font-bold px-10 py-2">
            Disconnect
          </span>
        )}
      </div>
      <hr className={` ${isLoading ? "animate-fadeIn my-8" : "opacity-0"}`} />
      <div className={` ${isLoading ? "animate-fadeIn " : "opacity-0"}`}>
        <div className="text-xl text-white my-1">Console log</div>
        <div className="bg-black border-2 shadow-inner flex shadow-gray-950  text-xl rounded-sm text-white px-3 pt-2 pb-20 text-start">
          <p className=" duration-75 animate-pulse ">&gt;_&nbsp;&nbsp;&nbsp;</p>
          {device_log}
        </div>
      </div>
    </div>
  );
}
