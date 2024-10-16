"use client";

import React, { useState, useEffect } from "react";

export default function DocumentForm() {
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <div
      className={`duration-1000  bg-gray-700 ${
        isLoading ? "grid grid-cols-[20%_80%] " : "w-full flex "
      }`}
    >
      <div
        className={`transition-opacity  duration-1000 ${
          isLoading
            ? "animate-fadeIn bg-gradient-to-tl from-blue-950 to-gray-800  px-5 py-5  shadow-md shadow-gray-950 border-r-2 border-gray-900"
            : "opacity-0"
        }  `}
      >
        <div className="text-2xl font-semibold bg-gray-900 px-10 py-3  text-white shadow-md shadow-gray-950 my-6 grid place-items-center">
          Side Bar
        </div>
        <div className=" duration-500 font-semibold hover:text-blue-900 text-xl w-full flex justify-start text-white my-10 px-5 ">
          Get Started
        </div>
        <div className=" duration-500 hover:text-blue-900 text-xl w-full flex justify-start text-gray-300 my-10 px-5 ">
          How to Connect
        </div>
        <div className=" duration-500 hover:text-blue-900 text-xl w-full flex justify-start text-gray-300 my-10 pl-5 ">
          How to switch home wifi
        </div>
        <div className=" duration-500 hover:text-blue-900 text-xl w-full flex justify-start text-gray-300 my-10 px-5 ">
          Control your devices
        </div>
        <div className=" duration-500 hover:text-blue-900 text-xl w-full flex justify-start text-gray-300 my-10 px-5 ">
          Log monitoring
        </div>
        <div className=" duration-500 hover:text-blue-900 text-xl w-full flex justify-start text-gray-300 my-10 px-5 ">
          Basic of IoT devices
        </div>
      </div>
      <div className=" grid place-items-center px-3  pb-20">
        <div
          className={`flex justify-center text-4xl py-6 text-center gap-4 duration-1000  ${
            isLoading
              ? "rounded-lg text-white px-32 bg-gray-900 my-5"
              : "opacity-0 px-0"
          }`}
        >
          Documentation
          <img
            src="/general/document.png"
            width={50}
            height={50}
            alt="doc_icon"
          />
        </div>

        <div className="bg-gray-800 w-full rounded-2xl grid place-items-center">
          <div className={`my-10 w-10/12 ${isLoading ? 'animate-fadeIn':'opacity-0'}`}>
            <li className="text-3xl text-white mb-5 font-semibold">Open Source IoT PlatForm</li>
            <div className="bg-gray-950 px-5 py-10  text-white text-2xl">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">This IoT PlatForm</span>: is designed to
              manage IoT devices and enable users to control them through a web
              interface. It allows users to operate IoT devices from anywhere,
              at any time, by simply connecting the devices to the internet and
              issuing commands through the application. This web based solution
              ensures seamless control and monitoring of IoT devices in real
              time, providing convenience and flexibility for users.
            </div>
          </div>

          <hr className={`w-5/6 my-5 ${isLoading ? 'animate-fadeIn':'opacity-0'}`} />

          <div className={`my-10 w-10/12 ${isLoading ? 'animate-fadeIn':'opacity-0'}`}>
            <li className="text-3xl text-white mb-5 font-semibold">Main Features</li>
            <div className="bg-gray-950 px-5 py-10  text-white text-2xl">
              &nbsp;&nbsp;&nbsp;&nbsp;The main features of this web application
              are as follows:
              <br /><br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">IoT device connectivity</span>: The web
              application is specifically designed for easy use with IoT
              devices.It allows users to connect their IoT devices to the web
              app effortlessly, enabling self-setup at home without the need for
              technical assistance.
              <br /><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">IoT device management</span>: Whether you
              have multiple IoT devices, the application simplifies device
              management by displaying all connected IoT devices on a single
              dashboard, making it easy to monitor and control each one.
              <br /><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">Real-time control and operation</span>: You
              can control and manage your IoT devices in real-time, from
              anywhere and at any time, as long as the devices are connected to
              the internet. The web app provides 24/7 access for issuing
              commands to your devices, no matter the location.
              <br /><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">Wi-Fi connection cinfiguration</span>: The
              application allows you to easily change the Wi-Fi connection of
              your IoT devices. You can update the Wi-Fi network's username and
              password through the web interface at any time, ensuring
              flexibility in managing your network settings.
            </div>
          </div>

          <div className={`my-10 w-10/12 ${isLoading ? 'animate-fadeIn':'opacity-0'}`}>
            <li className="text-3xl text-white mb-5 font-semibold">Devices</li>
            <div className="bg-gray-950 px-5 py-10  text-white text-2xl">
              &nbsp;&nbsp;&nbsp;&nbsp;The devices in this web application are
              categorized into three types:
              <br /><br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;1.<span className="text-green-500 bg-gray-800 shadow-inner shadow-gray-950 px-3 py-1 text-2xl font-semibold mx-2">Car</span> A remote-controlled car operated through the web application
              in real-time.
              <br/>It allows users to control its movements and change
              the Wi-Fi connection settings as needed. This device is ideal for
              demonstrating real-time operations and connectivity, making it an
              excellent educational tool for children to learn through
              interactive experiences.<br/><br/><div className="my-3"></div>
              &nbsp;&nbsp;&nbsp;&nbsp;2.<span className="text-green-500 bg-gray-800 shadow-inner shadow-gray-950 px-3 py-1 text-2xl font-semibold mx-2 ">Mechanicsm Arm</span> A robotic arm that can be
              controlled through the web application in real-time, following the
              user is commands. It features precise real-time control and offers
              the flexibility to switch Wi-Fi connections according to the user
              is preferences. Like the car, this device is designed to showcase
              how real-time operations and device connectivity work, serving as
              a useful teaching tool for children.<br/><br/><div className="my-3"></div>
              &nbsp;&nbsp;&nbsp;&nbsp;3.<span className="text-green-500 bg-gray-800 shadow-inner shadow-gray-950 px-3 py-1 text-2xl font-semibold mx-2 ">Smart Plane Pot</span> A plant pot
              integrated with IoT technology to automate watering based on soil
              moisture levels. It can water plants automatically or be
              controlled manually via the web application. Additionally, users
              can monitor soil moisture levels and access watering statistics
              for further analysis. This device enhances plant care through
              automation and data-driven insights.<div className="my-3"></div>
            </div>
          </div>

          <div className={`my-10 w-10/12 ${isLoading ? 'animate-fadeIn':'opacity-0'}`}>
            <li className="text-3xl text-white mb-5 font-semibold">Step 1 Adding your device
            </li>
            <div className="bg-gray-950 px-5 py-10  text-white text-2xl">
            To operate devices through the web application, you must know the <br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">Serial ID </span>: of the device. The Serial ID is required when adding a new device via the "Add Device" page.
              <br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">Key Points about the Serial ID</span>
              <li>Each device has a unique Serial ID that cannot be duplicated.</li>
              <li>The Serial ID is essential for establishing a connection between the device and the application.</li>
 

              <br/>
            </div>
          </div>
          <div className={`my-10 w-10/12 ${isLoading ? 'animate-fadeIn':'opacity-0'}`}>
            <li className="text-3xl text-white mb-5 font-semibold">Topic</li>
            <div className="bg-gray-950 px-5 py-10  text-white text-2xl">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">Start with </span>:
            </div>
          </div>
          <div className={`my-10 w-10/12 ${isLoading ? 'animate-fadeIn':'opacity-0'}`}>
            <li className="text-3xl text-white mb-5 font-semibold">Topic</li>
            <div className="bg-gray-950 px-5 py-10  text-white text-2xl">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">Start with </span>:
            </div>
          </div>
          <div className={`my-10 w-10/12 ${isLoading ? 'animate-fadeIn':'opacity-0'}`}>
            <li className="text-3xl text-white mb-5 font-semibold">Topic</li>
            <div className="bg-gray-950 px-5 py-10  text-white text-2xl">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 px-2 text-2xl font-semibold mr-1">Start with </span>:
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
