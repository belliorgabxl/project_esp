"use client";

import { useState } from "react";

interface ButtonProps {
  label: string;
  type: string;
  category: string;
  cmd: string;
}

const ToggleRecieve = ({ label, type, category, cmd }: ButtonProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handlePush = () => {
    setToggle(!toggle);
  };
  return (
    <button
      onClick={handlePush}
      className={`${
        toggle == true
          ? "relative bg-gradient-to-r from-blue-400 via-indigo-600 to-blue-900 border-white "
          : "bg-white shadow-inner shadow-black  text-white"
      }  rounded-full w-[100px] border-2  border-gray-200 px-[3px] pt-[2px] pb-[2px] cursor-pointer duration-1000 `}
    >
      <div
        className={`${
          toggle == true
            ? "bg-white shadow-inner shadow-black translate-x-14"
            : "bg-gradient-to-tr from-gray-300 via-indigo-300 to-gray-600 shadow-sm shadow-black"
        } relative w-[35px] h-[35px] duration-500  rounded-full`}
      >
        <div
          className={`${
            toggle == true ? "block  translate-x-4" : "hidden"
          } relative top-2  w-[17px] z-10 h-[17px] bg-yellow-400 shadow-md shadow-gray-600 duration-[2s] rounded-full`}
        ></div>
        <div
          className={`${
            toggle == true ? "block  translate-x-2 -translate-y-1" : "hidden"
          } relative top-0  w-[17px] h-[17px] bg-blue-700 shadow-md shadow-gray-600 duration-[2s] rounded-full`}
        ></div>
      </div>
    </button>
  );
};

export default ToggleRecieve;
