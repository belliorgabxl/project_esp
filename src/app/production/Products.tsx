import CRSProducts from "@/components/CRSProducts";
import React from "react";

export default function Products() {
  return (
    <div className="w-full pb-80 bg-gray-700 py-10">
      <div className="flex justify-center text-3xl font-bold ">
        <h1 className="text-white  bg-gray-900 shadow-gray-900 shadow-md  w-3/4 text-center py-4 rounded-lg">
          Production
        </h1>
      </div>
      {/* for the product */}
      <div className="mx-10 grid grid-cols-[40%_60%]  my-10">
        <div className="grid">
          <div className="bg-blue-950 my-3 hover:my-5  duration-1000 hover:bg-blue-900 text-white rounded-lg  py-10 px-5 shadow-md shadow-gray-900 grid grid-cols-[40%_60%]">
            <div className="shadow-md shadow-gray-900">
              <img
                src="assets/product_car.jpeg"
                width="full"
                height="full"
                alt="car"
              />
            </div>
            <div className="px-5 grid">
              <h1 className="text-2xl  bg-gray-600 px-5 grid place-items-center py-2  rounded-md shadow-md shadow-gray-900">Product : Car</h1>
              <p className="mt-2 text-lg">Board : ESP32</p>
              <p>Connection Type :  Wi-fi 2.4 GHz</p>
              <p className="px-2 w-4/5 grid place-content-center shadow-inner shadow-gray-900 bg-gray-500 text-white text-xl">Inventory : 4 pc.</p>
            </div>
          </div>
          <div className="bg-blue-950 my-3  hover:my-5 duration-1000 hover:bg-blue-900 text-white rounded-lg   py-10 px-5 shadow-md shadow-gray-900 grid grid-cols-[40%_60%]">
            <div className="shadow-md shadow-gray-900">
              <img
                src="assets/product_arm.jpeg"
                width="full"
                height="full"
                alt="arm"
              />
            </div>
            <div className="px-5 grid">
              <h1 className="text-xl  bg-gray-600 px-5 grid place-items-center py-2  rounded-md shadow-md shadow-gray-900">Product : Mechanic Arm</h1>
              <p className="mt-2 text-lg">Board : ESP32</p>
              <p>Connection Type :  Wi-fi 2.4 GHz</p>
              <p className="px-2 w-4/5 grid place-content-center shadow-inner shadow-gray-900 bg-gray-500 text-white text-xl">Inventory : 2 pc.</p>
            </div>
          </div>
          <div className="bg-blue-950 my-3  hover:my-5 duration-1000 hover:bg-blue-900 text-white rounded-lg  py-10 px-5 shadow-md shadow-gray-900 grid grid-cols-[40%_60%]">
            <div className="shadow-md shadow-gray-900">
              <img
                src="assets/product_pump.jpg"
                width="full"
                height="full"
                alt="pump"
              />
            </div>
            <div className="px-5 grid">
              <h1 className="text-2xl grid place-items-center  bg-gray-600 px-5  py-2  rounded-md shadow-md shadow-gray-900">Product : Pump</h1>
              <p className="mt-2 text-lg">Board : ESP32</p>
              <p>Connection Type :  Wi-fi 2.4 GHz</p>
              <p className="px-2 w-4/5 grid place-content-center shadow-inner shadow-gray-900 bg-gray-500 text-white text-xl">Inventory : 1 pc.</p>
            </div>
          </div>
        </div>
        <div className="px-10 flex justify-center ml-5 py-5 border-gray-800 rounded-xl border-4 shadow-md shadow-gray-900 ">
          <CRSProducts/>
        </div>
      </div>
    </div>
  );
}
