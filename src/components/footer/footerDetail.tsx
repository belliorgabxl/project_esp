"use client";
import Link from "next/link";
import React from "react";

export default function FooterDetail() {
  return (
    <>
      <div className=" my-4 grid grid-cols-[45%_20%_35%]">
        <div className="grid gap-5 w-full grid-cols-[30%_70%]">
          <img
            src="/images/iconweb_white.png"
            width={150}
            height={150}
            alt="icon"
          />
          <div className="grid w-4/5">
            <p className="text-white text-2xl font-bold">
              TELECOME IoT Web Application
            </p>
            <p className="text-gray-200 text-xl">
              สำหรับจัดการอุปกรณ์ Internet of Thing
            </p>
            <p className="text-white text-2xl font-bold">Our University</p>
            <p className="text-gray-200 text-xl">
              King Mongkut's Institute of Technology Ladkrabang
            </p>
          </div>
        </div>
        <div className="border-l-2 pl-10 grid place-items-center gap-2">
          <div className="grid h-full">
            <div className="text-2xl font-bold text-white">Help</div>
            <Link
              href="/aboutus"
              className="text-gray-200 text-xl hover:text-gray-800"
            >
              About Us
            </Link>
            <Link
              href="/documents"
              className="text-gray-200 text-xl hover:text-gray-800"
            >
              Tutorial
            </Link>
            <Link
              href="/documents"
              className="text-gray-200 text-xl hover:text-gray-800"
            >
              Documentation
            </Link>
            <Link
              href="/"
              className="text-gray-200 text-xl hover:text-gray-800"
            >
              Objective
            </Link>
          </div>
        </div>
        <div className="border-l-2 pl-10 ">
          <div className="text-2xl text-white font-bold text-center">
            Contact Us
          </div>
          <div className="my-2 flex gap-10 justify-center text-xl text-gray-200 ">
            <div>091-864-9154</div> | 
            <div>095-343-0364</div>
          </div>
          <div className="flex my-3">
            <img
              src="/general/facebook.png"
              width={40}
              height={40}
              className="mx-5"
              alt="icon"
            />
            <div className="text-xl text-gray-200 text-start pt-1 ">
              Facebook: Telecom KMITL
            </div>
          </div>
          <div className="flex my-3">
            <img src="/general/instagram.png"
            width={40}
            height={40} className="mx-5"
            alt="icon"/>  
              <div className="text-xl text-gray-200 text-start pt-1 ">
              Instagram : telecom.kmitl
            </div>  
            </div>
        </div>
      </div>
      <div className="flex my-4">
        <div className="flex">
          <p className="text-white underline text-2xl mx-2 font-semibold ">
            Copyright 2024
          </p>
          <p className="text-gray-300 text-xl mt-1">
            by Telecommunication. All Rights Reserved. IoT is Powered by
            telecom.vercel.app
          </p>
        </div>
        <div></div>
      </div>
    </>
  );
}
