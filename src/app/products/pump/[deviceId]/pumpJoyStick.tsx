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
  device_id,
  client,
  isConnected,
  topic,
}: Props) {
  const [isToggled, setIsToggled] = useState(false);
  const [pump_state, setPumpState] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setPumpState((pump_state) => !pump_state);
    onPump();
  };

  const onPump = async () => {
    if (client && isConnected) {
      if (pump_state == false) {
        client.publish(topic, "ctrl/on");
        console.log("on");
      } else {
        client.publish(topic, "ctrl/off");
        console.log("off")
      }
    }
  };
  return (
    <div className="pt-10  ">
      <div className="bg-gray-800 px-20 py-16 rounded-xl shadow-md shadow-gray-900">
        <div
          className={`flex  items-center cursor-pointer w-36 h-16 shadow-inner shadow-black p-1 rounded-full duration-1000 ${
            isToggled
              ? "bg-gradient-to-r from-blue-900 to-gray-800"
              : "bg-gradient-to-r from-gray-100 to-gray-300"
          } ${isLoading ? "animate-fadeIn" : "opacity-0"} `}
          onClick={handleToggle}
        >
          <div
            className={`bg-white grid place-items-center w-14 h-14 rounded-full shadow-md shadow-gray-900 transform duration-700 ${
              isToggled ? "translate-x-20" : ""
            }`}
          >
            <div
              className={` grid place-items-center  w-12 h-12 rounded-full   transform duration-700 ${
                isToggled
                  ? "translate-x-4 bg-blue-900 shadow-md shadow-black"
                  : "bg-white shadow-inner shadow-gray-600"
              }`}
            >
              <div
                className={`bg-blue-300  w-10 h-10 rounded-full   transform duration-700 ${
                  isToggled
                    ? "translate-x-4 bg-yellow-300 shadow-md shadow-black"
                    : "shadow-inner shadow-gray-500"
                }`}
              ></div>
            </div>
          </div>
        </div>
        {pump_state ? (
          <div
            className={`duration-1000  ${
              isLoading
                ? "text-white mt-6 font-semibold text-3xl text-center"
                : " bg-gray-300 shadow-md shadow-black px-10 text-gray-300 rounded-lg py-3"
            }`}
          >
            ON
          </div>
        ) : (
          <div
            className={`duration-1000 ${
              isLoading
                ? "text-white mt-6 font-semibold text-3xl text-center"
                : " bg-gray-300 shadow-md shadow-black px-10 text-gray-300 rounded-lg py-3"
            }`}
          >
            OFF
          </div>
        )}
      </div>
    </div>
  );
}
