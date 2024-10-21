"use client";
type Props = {
  isLoading: boolean;
};
export default function ProductDetail({ isLoading }: Props) {
  return (
    <div className="grid">
      <div
        className={` grid grid-cols-[40%_60%] ${
          isLoading
            ? "bg-blue-950 my-3 hover:my-5  duration-1000 hover:bg-blue-900 text-white rounded-lg  py-10 px-5 shadow-md shadow-gray-900"
            : "opacity-0"
        }`}
      >
        <div className="shadow-md shadow-gray-900">
          <img
            src="assets/product_car.jpeg"
            width="full"
            height="full"
            alt="car"
          />
        </div>
        <div className="px-5 grid">
          <h1 className="text-2xl  bg-gray-600 px-5 grid place-items-center py-2  rounded-md shadow-md shadow-gray-900">
            Product : Car
          </h1>
          <p className="mt-2 text-lg">Board : ESP32</p>
          <p>Connection Type : Wi-fi 2.4 GHz</p>
          <p className="px-2 w-4/5 grid place-content-center shadow-inner shadow-gray-900 bg-gray-500 text-white text-xl">
            Inventory : 4 pc.
          </p>
        </div>
      </div>
      <div
        className={` grid grid-cols-[40%_60%] ${
          isLoading
            ? "bg-blue-950 my-3 hover:my-5  duration-1000 hover:bg-blue-900 text-white rounded-lg  py-10 px-5 shadow-md shadow-gray-900"
            : "opacity-0"
        }`}
      >
        <div className="shadow-md shadow-gray-900">
          <img
            src="assets/product_arm.jpeg"
            width="full"
            height="full"
            alt="arm"
          />
        </div>
        <div className="px-5 grid">
          <h1 className="text-xl  bg-gray-600 px-5 grid place-items-center py-2  rounded-md shadow-md shadow-gray-900">
            Product : Robotic Arm
          </h1>
          <p className="mt-2 text-lg">Board : ESP32</p>
          <p>Connection Type : Wi-fi 2.4 GHz</p>
          <p className="px-2 w-4/5 grid place-content-center shadow-inner shadow-gray-900 bg-gray-500 text-white text-xl">
            Inventory : 2 pc.
          </p>
        </div>
      </div>
      <div
        className={` grid grid-cols-[40%_60%] ${
          isLoading
            ? "bg-blue-950 my-3 hover:my-5  duration-1000 hover:bg-blue-900 text-white rounded-lg  py-10 px-5 shadow-md shadow-gray-900"
            : "opacity-0"
        }`}
      >
        <div className="shadow-md shadow-gray-900">
          <img
            src="assets/product_pump.jpg"
            width="full"
            height="full"
            alt="pump"
          />
        </div>
        <div className="px-5 grid">
          <h1 className="text-2xl grid place-items-center  bg-gray-600 px-5  py-2  rounded-md shadow-md shadow-gray-900">
            Product : Auto Pump
          </h1>
          <p className="mt-2 text-lg">Board : ESP32</p>
          <p>Connection Type : Wi-fi 2.4 GHz</p>
          <p className="px-2 w-4/5 grid place-content-center shadow-inner shadow-gray-900 bg-gray-500 text-white text-xl">
            Inventory : 1 pc.
          </p>
        </div>
      </div>
    </div>
  );
}
