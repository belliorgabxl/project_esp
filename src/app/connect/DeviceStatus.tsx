"use client";

import React, { useContext } from "react";
import MqttContext from "./MqttContext";

const DeviceStatus: React.FC = () => {
  const { connectionStatus, lastMessage , deviceStatus } = useContext(MqttContext);

  return (
    <div>
    <h1>Cloud Connection Status</h1>
    <p>Status: {connectionStatus}</p>
    <div className="text-xl">
    Last Message :
    {lastMessage && <p className="text-blue-500 text-xl">Last Message : {lastMessage}</p>}
    </div>

    <div className="flex my-20 mx-20 justify-center text-2xl">
      Device : {deviceStatus == "online" ? <div className="text-green-500 font-bold">Connect Device</div>:(
        <div className="text-red-500 font-bold">
          Lost Connect
        </div>
      ) }
    </div>
  </div>
  );
};

export default DeviceStatus;