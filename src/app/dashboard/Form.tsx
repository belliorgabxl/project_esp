"use client";
import { Session } from "next-auth";

import React, { useEffect, useState } from "react";

interface DeviceData {
  deviceId: string;
  deviceLenght: number;
  deviceName: string;
  devicePath: string;
  deviceType: string;
  deviceOwner: string;
  productPassword: string;
  productId: number;
  status: string;
  wifiId: string;
  wifiConnect: string;
  description: string;
  actionId: number;
}
interface ProductData {
  _id: string;
  productId: string;
  pruductPassword: string;
  productType: string;
  productPath: string;
  status: string;
}
type Props = {
  user: Session["user"];
};


export default function Form({ user }: Props) {

  useEffect(() => {

  }, []);
  return (
    <div>

    </div>
  );
}



type AddDeviceProps ={
  setPopDevice : (value:boolean)=> void;
}
const AddDevice = ({setPopDevice}:AddDeviceProps)=>{
  return(
    <div
    className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
    onClick={()=>setPopDevice(false)}
  >
    <div
      className="bg-gray-800 lg:px-12 pl-20 px-10 md:px-10 py-5 lg:py-10 rounded-lg w-9/12 md:w-3/5 sm:w-3/5 lg:w-2/5 z-100 shadow-lg shadow-gray-950 "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="justify-center lg:text-3xl text-white font-semibold text-2xl">
        Add You Device
      </div>
      <div className="text-xl grid md:flex sm:flex lg:flex gap-3  text-white md:text-center sm:text-center lg:text-center my-5 ">
        <div className="py-2">
          Type: 
        </div>
        <select
          id="addDevice"
          // onChange={handleChangeType}
          className="bg-gray-500 border-2 h-fit w-3/5 px-5 py-2 border-black rounded-md line-clamp-1"
        >
          <option value="None">None-selected</option>
          <option value="transmitter">Transmitter</option>
          <option value="reciever">Reciever</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
      <div className="lg:flex md:flex sm:flex grid gap-3 md:text-center sm:text-center lg:text-center    my-5">
        <label className="text-xl py-2 h-fit line-clamp-1 text-white ">Device Name :</label>
        <input
          type="text"
          // onChange={handleChangeName}
          // value={device_name}
          className=" text-xl text-white lg:w-2/5 bg-gray-500 rounded-md py-2 px-2 w-3/5"
        />
      </div>
      <div className="my-5 lg:flex grid gap-3 md:flex sm:flex md:text-center sm:text-center lg:text-center ">
        <label className="text-xl text-white py-2 ">Serial ID :</label>
        <input
          type="text"
          // onChange={(e) => setProductId(e.target.value)}
          // value={}
          className=" text-xl text-white lg:w-2/5 bg-gray-500 rounded-md py-2 px-2 w-3/5"
        />
      </div>
      <div className="flex pt-4 gap-5 w-full justify-center ">
        {false == false ? (
          <button
            onClick={() => {
              // addDeviceSubmit();
            }}
            className="bg-blue-600 hover:bg-blue-900 text-white text-xl px-5 py-2 h-fit rounded-md lg:mx-10"
          >
            Submit
          </button>
        ) : (
          <div className="">
            <button
              disabled
              className="bg-blue-600 hover:bg-blue-900 text-white text-xl px-6 py-2 rounded-md h-fit lg:mx-10 flex"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="pl-2">Submit</span>
            </button>
          </div>
        )}   

        <button
          className="bg-red-500 h-fit hover:bg-red-700 lg:mx-10 text-white text-xl px-5 py-2 rounded-md"
          onClick={()=>setPopDevice(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}