"use client";

import React, { createContext, useEffect, useState, ReactNode, FC } from "react";
import mqtt, { MqttClient } from "mqtt";

interface MqttContextProps {
  client: MqttClient | null;
  connectionStatus: "Connected" | "Disconnected" | "Reconnecting";
  lastMessage: string | null; 
  deviceStatus:string | null;
}

const MqttContext = createContext<MqttContextProps>({
  client: null,
  connectionStatus: "Disconnected",
  lastMessage: null,
  deviceStatus:null,
});

interface MqttProviderProps {
  children: ReactNode;
  topic_device: string; 
}


export const MqttProvider: FC<MqttProviderProps> = ({ children, topic_device }) => {
  const [topic_devices , setTopic] = useState<string>(topic_device)

  

  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "Connected" | "Disconnected" | "Reconnecting"
  >("Disconnected");
  const [deviceStatus , setDeviceStatus] = useState <string|null>(null)
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(
      "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "admin",
        password: "Bam1234!",
        protocol: "wss",
      }
    );
  
    let timeout: NodeJS.Timeout;
  
    mqttClient.on("connect", () => {
      setConnectionStatus("Connected");
      mqttClient.subscribe(topic_devices, (err) => {
        if (err) {
          console.error("Failed to subscribe to topic", err);
        }
      });
    });
  
    mqttClient.on("message", (topic, message) => {
      if (topic == topic_devices) {
        const statusMessage = message.toString();
        console.log("log test at line 50 : ",statusMessage);
        if (statusMessage === "online") {
          console.log("set success")
          setConnectionStatus("Connected");
          setDeviceStatus(statusMessage)
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            setConnectionStatus("Disconnected");
            setDeviceStatus("Disconnect")
          }, 4000); 
        }
      }
    });
  
    mqttClient.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });
  
    setClient(mqttClient);
  
    return () => {
      clearTimeout(timeout);
      mqttClient.end();
    };
  }, []);

  return (
    <MqttContext.Provider value={{ client, connectionStatus, lastMessage ,deviceStatus}}>
      {children}
    </MqttContext.Provider>
  );
};

export default MqttContext;
