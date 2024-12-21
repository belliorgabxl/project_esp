"use client";

import { useState } from "react";

interface ButtonProps {
  label: string;
  type: string;
  category: string;
  cmd: string;
}

const PressButton = ({ label, type, category, cmd }: ButtonProps) => {
  return (
    <button
      className={`bg-yellow-500 text-white border-b-2 border-green-900 shadow-md shadow-black rounded-full px-2 py-2 text-center hover:opacity-90 active:bg-red-500  active:shadow-inner  active:shadow-black`}
    >
      {label == "Up" ? (
        <img src="/images/forwardwhite.png" width={70} height={70} />
      ) : label == "Down" ? (
        <img src="/images/backwhite.png" width={70} height={70} />
      ) : label == "Left" ? (
        <img src="/images/leftwhite.png" width={70} height={70} />
      ) : label == "Right" ? (
        <img src="/images/rightwhite.png" width={70} height={70} />
      ) : label == "Dot" ? (
        <div className="w-10 my-3 mx-3 h-10 rounded-full bg-black"></div>
      ) : (
        <div>None</div>
      )}
    </button>
  );
};

export default PressButton;
