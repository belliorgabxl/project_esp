"use client";
import Link from "next/link";
import React from "react";

export default function FooterDetail() {
  return (
    <div className="text-white py-5 bg-gray-900 flex items-center">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">


        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <img
              src="/images/iconweb_white.png"
              width={80}
              height={80}
              alt="icon"
            />
            <div>
              <h1 className="text-4xl font-bold">IoT</h1>
              <p className="text-sm">Web Application for IoT Device Management</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Contact</h2>
            <p>King Mongkut's Institute of Technology Ladkrabang.</p>
            <p>1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520, Thailand</p>
          </div>
          <div className="mt-6 text-2xl font-bold space-y-4">
            <a href="/aboutus" className="hover:text-gray-300">About Us</a>
            <a
              href="https://github.com/belliorgabxl/project_esp"
              className="flex items-center gap-2 text-sm hover:text-gray-300"
            >
              <img src="/images/github.png" alt="GitHub" width={50} height={50} />
              GitHub Source code
            </a>
            <a
              className="flex items-center gap-2 text-sm hover:text-gray-300"
            >
              <img src="/images/mail.png" alt="Mail" width={50} height={50} />
              64010153@kmitl.ac.th
            </a>
            <a
              className="flex items-center gap-2 text-sm hover:text-gray-300"
            >
              <img src="/images/discord.png" alt="Discord" width={50} height={50} />
              Community 
            </a>
          </div>
        </div>


        <div>
          <h1 className="text-2xl font-bold">Get Started</h1>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/register" className="hover:text-gray-300">Register</a>
            </li>
            <li>
              <a href="/login" className="hover:text-gray-300">Log In</a>
            </li>
          </ul>        
          <div>
            <h2 className="mt-6 text-2xl font-bold">Product</h2>
            <ul className="mt-4 space-y-2">
              <li>Robot Car</li>
              <li>Robotic Arm</li>
              <li>Plant Watering Devices</li>
              <li>Smoke detector</li>
            </ul>
          </div>
          <div>
            <h3 className="mt-6 text-2xl font-bold">Device Control</h3>
            <ul className="mt-4 space-y-2">
              <li>Robot Car</li>
              <li>Robotic Arm</li>
              <li>Plant Watering Devices</li>
              <li>Smoke detector</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Main Features</h1>
          <ul className="mt-4 space-y-2">
            <li>IoT device connectivity</li>
            <li>IoT device management</li>
            <li>Real-time control and operation</li>
            <li>Wi-Fi connection configuration</li>
          </ul>
          <div>
            <h2 className="mt-6 text-2xl font-bold">Help</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/documents" className="hover:text-gray-300">Document</a>
              </li>
              <li>
                <a href="/documents" className="hover:text-gray-300">Change Wi-Fi Network</a>
              </li>
              <li>
                <a href="/documents" className="hover:text-gray-300">Connection Status</a>
              </li>
              <li>
                <a href="/documents" className="hover:text-gray-300">What is Serial ID</a>
              </li>
              <li>
                <a href="/documents" className="hover:text-gray-300">How to Connect a Device to the Web Application</a>
              </li>
              <li>
                <a href="/documents" className="hover:text-gray-300">Unable to Control the Device?</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
