"use client"
import { useState , useEffect } from "react"
import mqtt, { MqttClient } from "mqtt";

export default function CarForm() {
    const [client, setClient] = useState<MqttClient | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [fw,setFW] = useState<boolean>(false);
    const [bw,setBW] = useState<boolean>(false);
    const [lf,setLF] = useState<boolean>(false);
    const [rt,setRT] = useState<boolean>(false);

    useEffect(() => {
    const client = mqtt.connect('wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt', {
        clientId: 'bf71c559-1fb8-447b-b6ca-ef29315b7b67',
        username: "admin",
        password: "Bam1234!",
        protocol: 'wss',
        });
    client.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to HiveMQ broker over WebSocket');
    });
    client.on('error', (err) => {
        console.error('Connection error: ', err.message);
        console.error('Details: ', err);
        client.end();
    });
    setClient(client);
    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  const Forward = async()=>{
    if (client && isConnected) {
        if(fw == false){
            client.publish('esp32/car/control', 'forward');
            setFW(true);console.log("forward : ON");
        }else if (fw==true){
            client.publish('esp32/car/control', 'stop');
            setFW(false);console.log("forward : OFF");
        }
      }
  }
  const Backward = async()=>{
    if (client && isConnected) {
        if(bw==false){
            client.publish('esp32/car/control', 'backward');
            setBW(true)
            console.log("backward : ON");
            
        }else if (bw == true){
            client.publish('esp32/car/control', 'stop');
            setBW(false)
            console.log("backward : OFF");
        }
      }
  }
  const Left = ()=>{
    if (client && isConnected) {
        if(lf==false){
            client.publish('esp32/car/control', 'left'); 
            setLF(true);console.log("left : ON");
        }else{
            client.publish('esp32/car/control', 'stop');
            setLF(false);console.log("left : OFF");
        }
      }
  }
  const Right = ()=>{
    if (client && isConnected) {
        if(rt==false){
            client.publish('esp32/car/control', 'right');  
            setRT(true);console.log("right : ON");
        }else{
            client.publish('esp32/car/control', 'stop');
            setRT(false);console.log("right : OFF");
        }
      }
  }
  return (
    <div>
        <div className={` bg-gradient-to-br from-blue-300 to-gray-800 w-full h-screen `}>
            <div className='pt-20 flex justify-center'>
                <div className={`bg-gradient-to-br from-blue-700 to-gray-700 border-4  px-6  rounded-full py-5 `}>
                    <div className='mx-2 my-3 flex justify-center'>
                        {fw==false ?(
                            <button onClick={()=>Forward()} className='bg-gray-800 hover:bg-gray-500 text-white px-5 py-5 rounded-full'><img src="/images/forwardWhite.png" height={40} width={40} alt="logo"/></button> 
                        ):(
                            <button onClick={()=>Forward()} className='bg-green-600 hover:bg-gray-500 text-white px-5 py-5 rounded-full'><img src="/images/forwardBlack.png" height={40} width={40} alt="logo"/></button> 
                        )}
                    </div>
                    <div className='flex justify-center'>
                        {lf == false ? (
                            <button onClick={()=>Left()} className='bg-gray-800 hover:bg-gray-500 mx-10 my-3  text-white px-5 py-5 rounded-full'><img src="/images/leftWhite.png" height={40} width={40} alt="logo"/></button>
                        ):
                        (
                            <button onClick={()=>Left()} className='bg-green-600 hover:bg-green-500 mx-10 my-3  text-white px-5 py-5 rounded-full'><img src="/images/leftBlack.png" height={40} width={40} alt="logo"/></button>
                        )}
                        {rt==false ? (
                            <button onClick={()=>Right()} className='bg-gray-800 hover:bg-gray-500 mx-10 my-3  text-white px-5 py-5 rounded-full'><img src="/images/rightWhite.png" height={40} width={40} alt="logo"/></button>
                        ):(
                            <button onClick={()=>Right()} className='bg-green-600 hover:bg-gray-500 mx-10 my-3  text-white px-5 py-5 rounded-full'><img src="/images/rightBlack.png" height={40} width={40} alt="logo"/></button>
                        )}
                    </div>
                    <div  className='flex justify-center'>
                        {bw == false ? (
                            <button onClick={()=>Backward()} className='bg-gray-800 hover:bg-gray-500  mx-2 my-3  text-white px-5 py-5 rounded-full'><img src="/images/backWhite.png" height={40} width={40} alt="logo"/></button>
                        ):(
                            <button onClick={()=>Backward()} className='bg-green-600 hover:bg-gray-500  mx-2 my-3  text-white px-5 py-5 rounded-full'><img src="/images/backBlack.png" height={40} width={40} alt="logo"/></button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
