"use client";
import mqtt, { MqttClient } from "mqtt";
import React, { useState } from "react";

type Props = {
  device_id: string;
  isLoading: boolean;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
  onLogReturn: (data: string) => void;
};

export default function CarJoyStick({
  isLoading,
  onLogReturn,
  device_id,
  client,
  isConnected,
  topic,
}: Props) {
  const [fw, setFW] = useState<boolean>(false);
  const [bw, setBW] = useState<boolean>(false);
  const [lf, setLF] = useState<boolean>(false);
  const [rt, setRT] = useState<boolean>(false);

  const [toggleBtn, setToggleBtn] = useState(false);
  const handleToggleON = () => {
    setToggleBtn(true);
  };
  const handleToggleOFF = () => {
    setToggleBtn(false);
  };
  const Forward = async () => {
    if (client && isConnected) {
      if (fw == false && toggleBtn == false) {
        client.publish(topic, "ctrl/forward");
        setFW(true);
        console.log("forward : ON");
        onLogReturn("forward : ON");
        handleToggleON();
      } else if (fw == true && toggleBtn == true) {
        client.publish(topic, "ctrl/stop");
        setFW(false);
        console.log("forward : OFF");
        onLogReturn("forward : OFF");
        handleToggleOFF();
      }
    }
  };
  const Backward = async () => {
    if (client && isConnected) {
      if (bw == false && toggleBtn == false) {
        client.publish(topic, "ctrl/backward");
        setBW(true);
        console.log("backward : ON");
        onLogReturn("backward : ON");
        handleToggleON();
      } else if (bw == true && toggleBtn == true) {
        client.publish(topic, "ctrl/stop");
        setBW(false);
        console.log("backward : OFF");
        onLogReturn("backward : OFF");
        handleToggleOFF();
      }
    }
  };
  const Left = () => {
    if (client && isConnected) {
      if (lf == false && toggleBtn == false) {
        client.publish(topic, "ctrl/left");
        setLF(true);
        console.log("left : ON");
        onLogReturn("left : ON");
        handleToggleON();
      } else if (lf == true && toggleBtn == true) {
        client.publish(topic, "ctrl/stop");
        setLF(false);
        console.log("left : OFF");
        onLogReturn("left : OFF");
        handleToggleOFF();
      }
    }
  };
  const Right = () => {
    if (client && isConnected) {
      if (rt == false && toggleBtn == false) {
        client.publish(topic, "ctrl/right");
        setRT(true);
        console.log("right : ON");
        onLogReturn("right : ON");
        handleToggleON();
      } else if (rt == true && toggleBtn == true) {
        client.publish(topic, "ctrl/stop");
        setRT(false);
        console.log("right : OFF");
        onLogReturn("right : OFF");
        handleToggleOFF();
      }
    }
  };

  return (
    <div className={`grid grid-rows-2 w-full ${isLoading ? "" : ""}  `}>
      <div
        className={`duration-1000 text-2xl shadow-md shadow-gray-900 text-white w-full rounded-2xl py-5 px-5 grid place-items-center ${
          isLoading ? " bg-blue-800" : "bg-gray-500"
        }  `}
      >
        <button
          onClick={Forward}
          className={`rounded-full mx-5 shadow-md shadow-gray-800 px-3 py-3 active:shadow-inner active:shadow-black  active:bg-purple-500  ${
            isLoading ? "bg-blue-700" : "bg-gray-500"
          } ${fw == true ? "bg-green-500" : ""}`}
        >
          <img
            className={` ${isLoading ? "animate-fadeIn" : "opacity-0"}`}
            src="/images/forwardWhite.png"
            height={50}
            width={50}
            alt="logo"
          />
        </button>
        <div className="flex">
          <button
            onClick={Left}
            className={`rounded-full mx-5 shadow-md shadow-gray-800 px-3 py-3 active:shadow-inner active:shadow-black   active:bg-purple-500  ${
              isLoading ? "bg-blue-700" : "bg-gray-500"
            } ${lf == true ? "bg-green-500" : ""}`}
          >
            {lf == true ? (
              <div>
                <img
                  className={` ${isLoading ? "animate-fadeIn" : "opacity-0"}`}
                  src="/images/leftBlack.png"
                  height={50}
                  width={50}
                  alt="logo"
                />
              </div>
            ) : (
              <div>
                <img
                  className={` ${isLoading ? "animate-fadeIn" : "opacity-0"}`}
                  src="/images/leftWhite.png"
                  height={50}
                  width={50}
                  alt="logo"
                />
              </div>
            )}
          </button>
          <button
            onClick={Right}
            className={`rounded-full mx-5 shadow-md shadow-gray-800 px-3 py-3 active:bg-purple-500 active:shadow-inner active:shadow-black  ${
              isLoading ? "bg-blue-700" : "bg-gray-500"
            } ${rt == true ? "bg-green-500" : ""}`}
          >
            {rt == true ? (
              <div>
                <img
                  className={` ${isLoading ? "animate-fadeIn" : "opacity-0"}`}
                  src="/images/rightBlack.png"
                  height={50}
                  width={50}
                  alt="logo"
                />
              </div>
            ) : (
              <div>
                <img
                  className={` ${isLoading ? "animate-fadeIn" : "opacity-0"}`}
                  src="/images/rightWhite.png"
                  height={50}
                  width={50}
                  alt="logo"
                />
              </div>
            )}
          </button>
        </div>
        <button
          onClick={Backward}
          className={`rounded-full mx-5 shadow-md shadow-gray-800 px-3 py-3 active:shadow-inner active:shadow-black  active:bg-purple-500  ${
            isLoading ? "bg-blue-700" : "bg-gray-500"
          } ${bw == true ? "bg-green-500" : ""}`}
        >
          {bw == true ? (
            <div>
              <img
                className={` ${isLoading ? "animate-fadeIn" : "opacity-0"}`}
                src="/images/backBlack.png"
                height={50}
                width={50}
                alt="logo"
              />
            </div>
          ) : (
            <div>
              <img
                className={` ${isLoading ? "animate-fadeIn" : "opacity-0"}`}
                src="/images/backWhite.png"
                height={50}
                width={50}
                alt="logo"
              />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}