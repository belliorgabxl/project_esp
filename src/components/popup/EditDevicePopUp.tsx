"use client";
import { Trash } from "lucide-react";
import React from "react";

interface EditDevicePopUpProps {
  onClosePopUp: (value: boolean) => void;
}

export default function EditDevicePopUp({
  onClosePopUp,
}: EditDevicePopUpProps) {
  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-gray-800  rounded-lg rounded-t-xl lg:w-[400px] md:w-3/5 sm:w-3/5  z-100 shadow-lg shadow-gray-950 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white text-2xl bg-gray-900 font-extrabold text-center w-full rounded-t-xl py-1">
          Edit Device
        </div>
        <div className="px-10 py-5">
          <div className="flex gap-4 items-center ">
            <label className="text-white text-lg ">Device Name</label>
            <input
              type="text"
              className="w-[150px] bg-gray-500 px-5 py-1 text-white rounded-md"
            />
          </div>
          <div className="mt-4 flex gap-2 items-center">
            <button className="flex items-center justify-center gap-2 px-4 py-1 bg-red-600 text-white rounded-md group hover:bg-red-700">
              <Trash style={{ width: "1.2rem", height: "1.2rem" }} />
              <span>Delete</span>
              <span className="text-sm absolute transform  translate-x-40 group-hover:block hidden text-red-500">
                if delete device is can't recover
              </span>
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-4 items-center">
            <button className="px-10 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-700">Save</button>
            <button className="px-10 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-700" onClick={()=>onClosePopUp(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
