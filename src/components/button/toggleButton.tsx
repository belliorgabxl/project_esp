"use client";

import { useState } from "react";

interface ButtonProps {
  label: string;
  type: string;
  category: string;
  cmd: string;
}

const ToggelButton = ({ label, type, category, cmd }: ButtonProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handlePush = () => {
    setToggle(!toggle);
  };
  return (
    <button
      onClick={handlePush}
      className={`${
        toggle == true
          ? "bg-pink-300 border-2 border-pink-500 text-black shadow-black shadow-inner  scale-[95%]"
          : "bg-pink-600 border-2 border-pink-500  shadow-md shadow-black text-white"
      }  rounded-xl  px-5 py-5 text-center hover:opacity-90  `}
    >
      {label == "Up" || label=="Forward" ? (
        <img src={`${toggle? '/images/forwardblack.png':'/images/forwardwhite.png'} `} width={50} height={50} />
      ) : label == "Down"|| label=="Backward"  ? (
        <img src={`${toggle? '/images/backblack.png':'/images/backwhite.png'} `} width={50} height={50} />
      ) : label == "Left" ? (
        <img src={`${toggle? '/images/leftblack.png':'/images/leftwhite.png'} `} width={50} height={50} />
      ) : label == "Right" ? (
        <img src={`${toggle? '/images/rightblack.png':'/images/rightwhite.png'} `} width={50} height={50} />
      ) : (
        <div>None</div>
      )}
    </button>
  );
};

export default ToggelButton;
