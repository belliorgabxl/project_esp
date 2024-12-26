"use client";
import MqttContext, { MqttProvider } from "@/app/connect/MqttContext";
import ConnectBrokerStatus from "@/components/Effect/ConnectBrokerStatus";
import ConnectDeviceStatus from "@/components/Effect/ConnectDeviceStatus";
import { MqttClient } from "mqtt";
import React, { useContext, useState } from "react";

type Props = {
  device_id: string;
  isLoading: boolean;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
  device_log: string;
  device_connect: boolean;
};
export default function CarPanel({ isLoading, topic, device_log }: Props) {
  const { connectionStatus, deviceStatus } = useContext(MqttContext);
  return (
    <div
      className={`duration-1000 gap-2  ml-5 shadow-md shadow-gray-900 bg-gradient-to-tr px-5 w-full from-blue-950 to-gray-800 rounded-lg ${
        isLoading ? " py-5 " : "py-0"
      }`}
    >
      <div className={` ${isLoading ? "animate-fadeIn" : "opacity-0"} flex justify-center items-center `}>
      <h1 className=" text-5xl font-extrabold text-gray-900 "><span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600  from-sky-400 line-clamp-1 ">Car IoT</span></h1>
      </div>
      <div
        className={`my-5 flex justify-between ${
          isLoading ? "animate-fadeIn " : "opacity-0"
        }`}
      >
        <span className="text-xl text-white my-1">Action Type : </span>
        <span className="bg-gray-600  mx-3 shadow-gray-950 text-center  text-xl rounded-lg text-white h-fit line-clamp-1 px-10 py-1">
          Transmitter
        </span>
      </div>

      <div
        className={`my-2 lg:flex justify-between md:flex grid gap-2  ${
          isLoading ? "animate-fadeIn" : "opacity-0"
        }`}
      >
        <div className="text-xl text-white my-1 h-fit line-clamp-1">
          Cloud Connection :
        </div>
        {topic && (
          <MqttProvider topic_device={topic}>
            <ConnectBrokerStatus />
          </MqttProvider>
        )}
      </div>
      <div
        className={`my-4 flex justify-between ${
          isLoading ? "animate-fadeIn " : "opacity-0"
        }`}
      >
        <span className="text-xl text-white my-1">Device Status : </span>
        {topic && (
          <MqttProvider topic_device={topic}>
            <ConnectDeviceStatus />
          </MqttProvider>
        )}
      </div>
      <div
        className={`my-5 flex justify-between ${
          isLoading ? "animate-fadeIn " : "opacity-0"
        }`}
      >
        <span className="text-xl text-white my-1">Topic : </span>
        <span className="bg-gray-600  mx-3 shadow-gray-950 text-center  text-xl rounded-lg text-white  px-10 py-1">
          {topic}
        </span>
      </div>
      <hr className={`my-8 ${isLoading ? "animate-fadeIn " : "opacity-0"}`} />
      <div className={` ${isLoading ? "animate-fadeIn " : "opacity-0"}`}>
        <div className="text-xl text-white my-1">Console log</div>
        <div className="bg-black border-2  flex shadow-gray-950  text-xl rounded-lg text-white px-3 pt-2 pb-10 text-start">
          <p className=" duration-75 animate-pulse ">&gt;_&nbsp;&nbsp;&nbsp;</p>
          {device_log}
        </div>
      </div>
    </div>
  );
}
