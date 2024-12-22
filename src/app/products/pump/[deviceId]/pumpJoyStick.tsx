"use client";
import { MqttClient } from "mqtt";
type Props = {
  device_id: string;
  isLoading: boolean;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
  onLogReturn: (data: string) => void;
};

import React, { useState } from "react";

export default function PumpJoyStick({
  isLoading,
  onLogReturn,
  client,
  isConnected,
  topic,
}: Props) {
  const [pump_state, setPumpState] = useState(false);

  const onPump = async () => {
    if (client && isConnected) {
      client.publish(topic, "ctrl/on");
      console.log("on");
      onLogReturn("ON");
    }
  };
  return (
    <div className="pt-10 justify-center ">
      <div className="bg-gray-800 justify-center px-5 py-5 rounded-xl shadow-md shadow-gray-950">
        <div
          className={`flex justify-center  w-2/5 py-4 items-center cursor-pointer bg-gray-400 shadow-md shadow-gray-950 text-white text-2xl font-semibold active:bg-blue-500 active:shadow-inner active:shadow-black  p-1 rounded-full duration-300 ${
            isLoading ? "animate-fadeIn" : "opacity-0"
          } `}
          onClick={onPump}
        >
          ON
        </div>
        {pump_state ? (
          <div
            className={`duration-1000  ${
              isLoading
                ? "text-white mt-6 font-semibold text-3xl text-center"
                : " bg-gray-300 shadow-md shadow-black px-10 text-gray-300 rounded-lg py-3"
            }`}
          >
            
          </div>
        ) : (
          <div
            className={`duration-1000 ${
              isLoading
                ? "text-white mt-6 font-semibold text-3xl text-center"
                : " bg-gray-300 shadow-md shadow-black px-10 text-gray-300 rounded-lg py-3"
            }`}
          >
            Chart
          </div>
        )}
      </div>
    </div>
  );
}
