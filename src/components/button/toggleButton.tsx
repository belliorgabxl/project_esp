"use client";

import { MqttClient } from "mqtt";
import { useState } from "react";

interface ButtonProps {
  label: string;
  type: string;
  category: string;
  cmd: string;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
  onLogReturn: (data: string) => void;
}

const ToggelButton = ({
  label,
  type,
  category,
  cmd,
  client,
  isConnected,
  topic,
  onLogReturn,
}: ButtonProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const Control = async (cmd: string) => {
    if (client && isConnected) {
      if (toggle == false) {
        client.publish(topic, `ctrl/${cmd}`);
        console.log(`Command : ${cmd.toUpperCase()}`);
        onLogReturn(`Command : ${cmd.toUpperCase()}`);
      }else if (toggle == true){
        client.publish(topic, `ctrl/stop`);
        console.log(`Command : STOP`);
        onLogReturn(`Command : STOP`);
      }
      setToggle(!toggle);
    }
  };

  const handlePush = () => {
    setToggle(!toggle);
  };
  return (
    <button
      onClick={() => {
        Control(cmd);
      }}
      className={`${
        toggle == true
          ? "bg-pink-300 border-2 border-pink-500 text-black shadow-black shadow-inner  scale-[95%]"
          : "bg-pink-600 border-2 border-pink-500  shadow-md shadow-black text-white"
      }  rounded-xl  px-5 py-5 text-center hover:opacity-90  `}
    >
      {label == "Up" || label == "Forward" ? (
        <img
          src={`${
            toggle ? "/images/forwardblack.png" : "/images/forwardwhite.png"
          } `}
          width={50}
          height={50}
        />
      ) : label == "Down" || label == "Backward" ? (
        <img
          src={`${toggle ? "/images/backblack.png" : "/images/backwhite.png"} `}
          width={50}
          height={50}
        />
      ) : label == "Left" ? (
        <img
          src={`${toggle ? "/images/leftblack.png" : "/images/leftwhite.png"} `}
          width={50}
          height={50}
        />
      ) : label == "Right" ? (
        <img
          src={`${
            toggle ? "/images/rightblack.png" : "/images/rightwhite.png"
          } `}
          width={50}
          height={50}
        />
      ) : (
        <div>None</div>
      )}
    </button>
  );
};

export default ToggelButton;
