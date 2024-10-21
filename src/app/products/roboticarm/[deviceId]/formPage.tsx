"use client";
import mqtt, { MqttClient } from "mqtt";
import { useEffect, useState } from "react";
import ArmJoyStick from "./armJoyStick";
import ArmPanel from "./armPanel";
import { toast } from "react-toastify";

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
  const deviceId = device_id
  const [isLoading, setLoading] = useState<boolean>(false);
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [hover, setHover] = useState(false);
  const [returnedData, setReturnedLog] = useState<string>("");
  const [popUp_click, setPopUpClick] = useState<boolean>();
  const [wifiName, setWifiName] = useState<string>();
  const [wifiPW, setWifiPW] = useState<string>();
  const [wifiData, setWifiData] = useState<WifiData>();
  const [popUp_clearWifi, setPopUpclearWifi] = useState<boolean>();
  const [deviceData, setDeviceData] = useState<DeviceData>();
  const [topic, setTopic] = useState<string >('');
  const [deviceConnected , setDeviceConnected] = useState<boolean>(false);

  useEffect(() => {
    fetchDeviceId(deviceId).then((item: any) => {
      setDeviceData(item);
      setLoading(true);
      setTopic(item.devicePath);
    });
    setLoading(true);
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

    useEffect(()=>{
    console.log("Listen Event Start...")
    const client = mqtt.connect(
      "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "admin",
        password: "Bam1234!",
        protocol: "wss",
      }
    );
      console.log("is connecting...")
      client.on("connect", () => {
        if (topic != null) {
          client.subscribe(topic, (err) => {
            if (!err) {
              console.log("Subscribed to Connected Message");
            }
          });
        } else {
          console.log("none topic");
        }
      });
      client.on("message", (topic, message) => {
        console.log(`Received message on ${topic}: ${message}`);
        if (message.toString() == "connected"){
          setDeviceConnected(true)
        } 
      });
  },[topic])



  

  const handleLogReturn = (data: string) => {
    setReturnedLog(data);
    console.log("Data received from ArmJoyStick:", data);
  };
  

  const onClickPopUp = async () => {
    setPopUpClick(true);
    if (deviceData?.wifiId) {
      await fetchWifiId(deviceData?.wifiId).then((item) => {
        setWifiData(item);
      });
    }
  };
  const onClosePopUp = () => {
    setPopUpClick(false);
  };

  const onClickPopUpClearWifi = async () => {
    setPopUpclearWifi(true);
  };
  const onClosePopUpClearWifi = () => {
    setPopUpclearWifi(false);
  };
  const handleClearDefaultWifi = async () => {
    if (client && isConnected) {
      client.publish(topic, `defaultwifi`);
      try {
        let newWifiName = "Default";
        let newWifiPassword = "12345678";
        let newStatus = "none";
        const response = await fetch(
          `http://localhost:3000/api/wifi/${wifiData?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              newWifiName,
              newWifiPassword,
              newStatus,
            }),
          }
        );
        if (response.ok) {
          toast.success("wi-fi Cleared !!");
          onClosePopUpClearWifi();
          onClosePopUp();
        } else {
          toast.error("something went wrong.");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Lost Connect...");
    }
  };
  const handleWifiEdit = async () => {
    if (client && isConnected) {
      if (wifiName && wifiPW) {
        const wfn = wifiName;
        const wfp = wifiPW;
        console.log(`wfn:${wfn},wfp:${wfp}`);
        client.publish(topic, `wfn:${wfn},wfp:${wfp}`);
        try {
          let newWifiName = wifiName;
          let newWifiPassword = wifiPW;
          let newStatus = "Change";
          const response = await fetch(
            `http://localhost:3000/api/wifi/${wifiData?._id}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                newWifiName,
                newWifiPassword,
                newStatus,
              }),
            }
          );
          if (response.ok) {
            toast.success("wi-fi changed.");
            onClosePopUp();
          } else {
            toast.error("something went wrong.");
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        toast.error("Please Change wi-fi name & password.");
      }
    } else {
      toast.error("wait to connecting...");
    }
  };

  return (
    <div className={`bg-gray-700 pb-60 `}>
      <div className=" flex justify-center pt-3 mb-2">
        <div className=" mx-3 w-1/5 px-10 py-4 text-2xl text-white"></div>
        <span className="w-full grid place-content-center ">
          <h1
            className={`duration-1000 py-3 ${
              isLoading
                ? "px-14 text-3xl text-white shadow-md shadow-gray-950 bg-gray-800 rounded-md"
                : "px-0 text-gray-700"
            }`}
          >
            Robotic Arm Controller
          </h1>
        </span>
        <button
          className={`flex justify-center gap-4  mx-3 w-3/12 h-4/6  py-2 text-xl rounded-lg  shadow-md shadow-gray-900 active:shadow-inner active:shadow-black   hover:bg-blue-400 hover:text-black ${
            isLoading
              ? "px-5 text-white bg-blue-600"
              : "px-0 bg-blue-300 text-blue-300"
          } `}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={onClickPopUp}
        >
          <img
            src={
              hover
                ? "/general/wifiBlack_icon.png"
                : "/general/wifiWhite_icon.png"
            }
            alt="icon"
            className={`w-7 h-7 ${isLoading ? "animate-fadeIn" : "opacity-0"} `}
          />
          Wi-fi setting
        </button>
      </div>
    

      <div className="grid grid-cols-[35%_65%]">
        <div className="flex justify-center px-10 py-5 w-full h-full my-5">
          <ArmPanel
            client={client}
            isConnected={isConnected}
            topic={topic}
            isLoading={isLoading}
            device_id={device_id}
            device_log={returnedData}
            device_connect={deviceConnected}
          />
        </div>

        <div className="flex justify-center px-10 py-5 w-full h-full my-5">
          <ArmJoyStick
            client={client}
            isConnected={isConnected}
            topic={topic}
            isLoading={isLoading}
            device_id={device_id}
            onLogReturn={handleLogReturn}
          />
        </div>
      </div>
    </div>
  );
}
