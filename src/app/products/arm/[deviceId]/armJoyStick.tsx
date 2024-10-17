"use client";
import mqtt, { MqttClient } from "mqtt";
import React, { useState } from 'react'

type Props = {
    device_id: string;
    isLoading: boolean;
    client : MqttClient | null;
    isConnected:boolean;
    topic:string;
    onLogReturn: (data: string) => void;
};

export default function ArmJoyStick({device_id , isLoading ,client,isConnected,topic,onLogReturn,}:Props) {
    const [fw, setFW] = useState<boolean>(false);
    const [bw, setBW] = useState<boolean>(false);
    const [lf, setLF] = useState<boolean>(false);
    const [rt, setRT] = useState<boolean>(false);
    const [up , setUp] = useState<boolean>(false);
    const [down , setDown] = useState<boolean>(false);
    const [hold , setHold] = useState<boolean>(false);

    const Forward = async () => {
        if (client && isConnected) {
            client.publish(topic, "ctrl/forward");
            console.log("forward : ON");
            onLogReturn("forward : ON")
        }
      };
      const Backward = async () => {
        if (client && isConnected) {
            client.publish(topic, "ctrl/backward");
            console.log("backward : ON");
            onLogReturn("backward : ON")

        }
      };
      const Left = async () => {
        if (client && isConnected) {
            client.publish(topic, "ctrl/left");
            console.log("left : ON");
            onLogReturn("left : ON")
        }
      };
      const Right = async () => {
        if (client && isConnected) {
            client.publish(topic, "ctrl/right");
            console.log("right : ON");
            onLogReturn("right : ON")
        }
      };
      const Up = async () => {
        if (client && isConnected) {
            client.publish(topic, "ctrl/up");
            console.log("up : ON");
            onLogReturn("up : ON")
        }
      };
      const Down = async () => {
        if (client && isConnected) {
            client.publish(topic, "ctrl/down");
            console.log("down : ON");
            onLogReturn("down : ON");
        }
      };
      const Hold = () => {
        if (client && isConnected) {
          if (hold == false) {
            client.publish(topic, "ctrl/holdON");
            setHold(true);
            console.log("hold : ON");
            onLogReturn("hold : ON")
          } else {
            client.publish(topic, "ctrl/holdOFF");
            setHold(false);
            console.log("hold : OFF");
            onLogReturn("hold : OFF")
          }
        }
      };
    



  return (

        <div  className={`grid grid-rows-2 w-2/4 ${isLoading? '':''}  `}>
            <div className='grid grid-cols-[50%_50%] gap-2 mb-2'>
                <div className={` duration-1000 text-2xl grid place-items-center py-5 shadow-md  shadow-gray-900 text-white w-full rounded-lg  ${isLoading? ' bg-blue-800':'bg-gray-500'} `}>
                    <button className={`duration-75 bg-gray-800 rounded-full px-8 shadow-md shadow-gray-900 py-2 mx-5 active:bg-violet-700 ${isLoading? 'animate-fadeIn':'opacity-0'} `} onClick={Up}>Up</button>
                    <button className={`duration-75 bg-gray-800 rounded-full px-8 shadow-md shadow-gray-900 py-2 mx-5 active:bg-violet-700 ${isLoading? 'animate-fadeIn':'opacity-0'} `} onClick={Down}>Down</button>
                </div>
                <div className={`duration-1000 grid place-items-center shadow-md shadow-gray-900  rounded-full ${isLoading? 'bg-blue-800':'bg-gray-500'} `}>
                    {hold == false ? (
                        <button className={`active:shadow-inner active:shadow-black text-4xl duration-75 bg-gray-800 active:bg-violet-700  shadow-md shadow-gray-900 text-white  rounded-full py-8 px-2 ${isLoading? 'animate-fadeIn':'opacity-0'} `} onClick={Hold}>
                        HOLD
                    </button>   
                    ):(
                    <button className={`active:shadow-inner active:shadow-black text-4xl duration-75 bg-green-600 active:bg-violet-700  shadow-md shadow-gray-900 text-white  rounded-full py-8 px-2 ${isLoading? 'animate-fadeIn':'opacity-0'} `} onClick={Hold}>
                        HOLD
                    </button>  
                    )}
                 
                </div>
                
            </div>
                <div className={`duration-1000 text-2xl shadow-md shadow-gray-900 text-white w-full rounded-lg py-5 px-5 grid place-items-center ${isLoading? ' bg-blue-800':'bg-gray-500'}  `}>
                    <button className={`duration-500 bg-gray-800 rounded-full px-8 shadow-md shadow-gray-900 py-2 mx-5 active:bg-violet-700 ${isLoading? 'animate-fadeIn':'opacity-0'} `} onClick={Forward}>Forward</button>
                    <div className='flex my-2'>
                        <button className={`duration-75 bg-gray-800 rounded-full px-8 shadow-md shadow-gray-900 py-2 mx-5 active:bg-violet-700 ${isLoading? 'animate-fadeIn':'opacity-0'} `}  onClick={Left}>Left</button>
                        <button className={`duration-75 bg-gray-800 rounded-full px-8 shadow-md shadow-gray-900 py-2 mx-5 active:bg-violet-700 ${isLoading? 'animate-fadeIn':'opacity-0'} `} onClick={Right}>Right</button>
                    </div>
                    <button className={`duration-75 bg-gray-800 rounded-full px-8 shadow-md shadow-gray-900 py-2 mx-5 active:bg-violet-700 ${isLoading? 'animate-fadeIn':'opacity-0'} `} onClick={Backward}>Back</button>
                </div>
        </div>
  )
}
