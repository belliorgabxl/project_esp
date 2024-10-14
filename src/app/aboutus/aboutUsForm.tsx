"use client";
import CRSAboutUs from "@/components/CLS/CRSAboutUs";

import React, { useEffect, useState } from "react";
import AboutUsDetail from "./aboutUsDetail";
import AboutUsPage_article from "@/components/article/aboutusPageDetail";

export default function AboutUsForm() {
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <div className="w-full pb-40  bg-gray-700">
      <div className="grid place-items-center pb-20">
        <div className="shadow-lg shadow-gray-800">
          <CRSAboutUs isLoading={isLoading} />
        </div>
        <h1
          className={`text-4xl bg-gray-800 my-5  py-6 text-center duration-1000 hover:bg-gray-900 text-white ${
            isLoading ? "px-80" : "px-10"
          }`}
        >
          About us
        </h1>
        <div className="w-full px-10 flex justify-start">
          <h1
            className={`text-2xl my-5 duration-1000 text-white py-4 rounded-lg bg-blue-900  ${
              isLoading ? "px-60" : "px-4 bg-gray-950"
            }`}
          >
            Developer
          </h1>
        </div>
        <AboutUsDetail isLoading={isLoading} />
        <div className="w-full px-10 flex justify-start">
          <h1
            className={`text-2xl my-5 duration-1000 text-white py-4 rounded-lg bg-blue-900  ${
              isLoading ? "px-60" : "px-4 bg-gray-950"
            }`}
          >
            Advisor
          </h1>
        </div>
        <div>
          <div
            className={`duration-1000 flex w-full justify-center  my-5 ${
              isLoading ? "px-10" : "opacity-0 h-10 px-0"
            }`}
          >
            <div className="bg-gray-900 w-3/4 text-white px-10 py-5 rounded-lg">
              <p className="text-3xl ">Assoc.Prof.Dr. Watid Phakphisut</p>
              <p className="text-3xl mt-2">รศ.ดร.เวธิต ภาคย์พิสุทธิ์</p>
              <hr className="my-4" />
              <p className="my-4 text-2xl">Telecommunication</p>
              <p className="my-4 text-2xl">Faculty Of Engineering</p>
            </div>
            <div className="">
              <img
                src="aboutus/watid1.jpg"
                width={"full"}
                height={"full"}
                alt="gabel"
                className="rounded-xl shadow-md shadow-gray-800"
              />
            </div>
          </div>
        </div>
        <div className="w-full px-10 flex justify-start">
          <h1
            className={`text-2xl my-5 duration-1000 text-white py-4 rounded-lg bg-blue-900  ${
              isLoading ? "px-60" : "px-4 bg-gray-950"
            }`}
          >
            Telecommunication
          </h1>
        </div>
        <AboutUsPage_article isLoading={isLoading}/>
      </div>
    </div>
  );
}
