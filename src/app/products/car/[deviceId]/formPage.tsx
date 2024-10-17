"use client";
import { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";
import { toast } from "react-toastify";
import CarJoyStick from "./carJoyStick";
import CarPanel from "./carPanel";

type Props = {
  device_id: string;
};

interface DeviceData {
  deviceId: string;
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

interface WifiData {
  _id: string;
  wifiId: string;
  wifiName: string;
  wifiPassword: string;
  status: string;
}
const fetchDeviceId = async (deviceId: string) => {
  const response = await fetch(`http://localhost:3000/api/devices/${deviceId}`);
  return response.json();
};

const fetchWifiId = async (wifiId: string) => {
  const ressponse = await fetch(`http://localhost:3000/api/wifi/${wifiId}`);
  return ressponse.json();
};

export default function FormPage({ device_id }: Props) {
  const deviceId = device_id;
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [returnedLog, setReturnedLog] = useState<string>("");
  const [hover, setHover] = useState(false);

  const [deviceData, setDeviceData] = useState<DeviceData>();
  useEffect(() => {
    fetchDeviceId(deviceId).then((item: any) => {
      setDeviceData(item);
      setLoading(true);
      //   setTopic(item.devicePath);
      setTopic("1011");
    });
    const client = mqtt.connect(
      "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "admin",
        password: "Bam1234!",
        protocol: "wss",
      }
    );
    client.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to HiveMQ broker over WebSocket");
    });
    client.on("error", (err) => {
      console.error("Connection error: ", err.message);
      console.error("Details: ", err);
      client.end();
    });
    setClient(client);
    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  const getLogReturned = (data: string) => {
    setReturnedLog(data);
  };
  return (
    <div className={`bg-gray-700 pb-60 `}>
      <div className=" flex justify-center pt-3 mb-2">
        <div  className=" mx-3 w-1/5 px-10 py-4 text-2xl text-white"></div>
        <span className="w-full grid place-content-center ">
          <h1
            className={`duration-1000 py-3 ${
              isLoading
                ? "px-14 text-3xl text-white shadow-md shadow-gray-950 bg-gray-800 rounded-md"
                : "px-0 text-gray-700"
            }`}
          >
            Car Controller
          </h1>
        </span>
        <button className={`flex justify-center gap-4  mx-3 w-3/12 h-4/6  py-2 text-xl rounded-lg  shadow-md shadow-gray-900 active:shadow-inner active:shadow-black   hover:bg-blue-400 hover:text-black ${isLoading ? 'px-5 text-white bg-blue-600':'px-0 bg-blue-300 text-blue-300'} `} onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
        <img
        src={hover ? "/general/wifiBlack_icon.png" : "/general/wifiWhite_icon.png"}
        alt="icon"
        className={`w-7 h-7 ${isLoading ? 'animate-fadeIn':'opacity-0'} `}
      />Wi-fi setting
        </button>
      </div>

      <div className="grid grid-cols-[15%_35%_30%_30%]">
        <div></div>
        <div className="flex justify-center pl-20 mr-10 py-5 w-full  my-5">
          <CarPanel
            isConnected={isConnected}
            client={client}
            topic={topic}
            isLoading={isLoading}
            device_id={deviceId}
            device_log={returnedLog}
          />
        </div>

        <div className="flex justify-center ml-10 px-10 py-5 w-full h-full my-5">
          <CarJoyStick
            isConnected={isConnected}
            client={client}
            topic={topic}
            isLoading={isLoading}
            device_id={deviceId}
            onLogReturn={getLogReturned}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}
