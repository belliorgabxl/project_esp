import { Session } from "next-auth";
import React from "react";

type Props = {
  user: Session["user"];
};

export default function Form() {
  return (
    <div className={`w-full bg-gray-800`}>
        <div className="absolute  text-white bg-gray-900 px-20 py-4 text-3xl my-3 rounded-xl  left-1/2 transform -translate-x-1/2">
            Dashboard
        </div>
        <div className="flex justify-end gap-5 px-5">
          <button className="rounded-md bg-blue-600 px-10 py-2 my-5 text-white hover:opacity-80 ">
            Add Product
          </button>
          <button className="rounded-md bg-blue-600 px-10 py-2 my-5 text-white hover:opacity-80 ">
            Import Device
          </button>
        </div>
    </div>
  );
}
