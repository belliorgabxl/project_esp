"use client";
import mqtt, { MqttClient } from "mqtt";
import { useEffect, useState } from "react";
import ArmJoyStick from "./armJoyStick";
import ArmPanel from "./armPanel";

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
  
export default function FormPage({ device_id }: Props) {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [client, setClient] = useState<MqttClient | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>("");


  useEffect(() => {
    setLoading(true);
    const client = mqtt.connect(
        "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
        {
          username: "admin",
          password: "Bam1234!",
          protocol: "wss",
        }
    )
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


  return (
    <div className={`bg-gray-700 pb-60 `}>
        <div className="w-full grid place-content-center pt-3 mb-2">
          <h1 className={`duration-1000 py-3 ${isLoading ? 'px-14 text-3xl text-white shadow-md shadow-gray-950 bg-gray-800 rounded-md':'px-0 text-gray-700'}`}>Mechanism Arm Controller</h1>  
        </div>
        
      <div className="grid grid-cols-[35%_65%]">
        <div className="flex justify-center px-10 py-5 w-full h-full my-5">
            <ArmPanel client={client} isConnected={isConnected} topic={topic} isLoading={isLoading} device_id={device_id}/>
        </div>

        <div className="flex justify-center px-10 py-5 w-full h-full my-5">
            <ArmJoyStick client={client} isConnected={isConnected} topic={topic} isLoading={isLoading} device_id={device_id}/>
        </div>
      </div>
    </div>
  );
}
