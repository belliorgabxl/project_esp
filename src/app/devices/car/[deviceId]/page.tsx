"use client"
import { useState , useEffect, FormEvent } from "react"
import mqtt, { MqttClient } from "mqtt";
import { toast } from "react-toastify";

interface DeviceData{
    deviceId:string,
    deviceName:string,
    devicePath:string,
    deviceType:string,
    deviceOwner:string,
    productPassword:string,
    productId:number,
    status:string,
    wifiId:string,
    wifiConnect:string,
    description:string,
    actionId:number
}

interface WifiData{
    _id:string;
    wifiId:string,
    wifiName:string,
    wifiPassword:string,
    status:string
}

const fetchDeviceId = async(deviceId:string)=>{
    const response =  await fetch(`http://localhost:3000/api/devices/${deviceId}`)
    return response.json();
}

const fetchWifiId = async (wifiId:string)=>{
    const ressponse = await fetch(`http://localhost:3000/api/wifi/${wifiId}`)
    return ressponse.json();
}

export default function CarForm({ params }: { params: { deviceId: string } }) {
    const deviceId = params.deviceId;

    const [deviceData , setDeviceData] = useState<DeviceData>();

    const [popUp_click , setPopUpClick] = useState<boolean>();
    const [wifiName , setWifiName] =useState<string>();
    const [wifiPW , setWifiPW] =useState<string>();
    const [wifiData , setWifiData] = useState<WifiData>();


    const [client, setClient] = useState<MqttClient | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [fw,setFW] = useState<boolean>(false);
    const [bw,setBW] = useState<boolean>(false);
    const [lf,setLF] = useState<boolean>(false);
    const [rt,setRT] = useState<boolean>(false);
    
    useEffect(() => {
        fetchDeviceId(deviceId).then((item:any)=>{
            setDeviceData(item)
        })

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
  const onClickPopUp= async()=>{
    setPopUpClick(true)
    if( deviceData?.wifiId){
       await fetchWifiId(deviceData?.wifiId).then((item)=>{
        setWifiData(item)
       })
       console.log(wifiData)
    }
  }
  const onClosePopUp=()=>{
    setPopUpClick(false)
  }
const handleEdit = async()=>{
    if (client && isConnected) {
        if(wifiName && wifiPW){
            const wfn = wifiName
            const wfp= wifiPW
            
            console.log(`wfn:${wfn},wfp:${wfp}`)
            client.publish('esp32/car/control', `wfn:${wfn},wfp:${wfp}`);
            try{
                let newWifiName = wifiName
                let newWifiPassword = wifiPW
                let newStatus = "Change"
                const response = await fetch(`http://localhost:3000/api/wifi/${wifiData?._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            newWifiName,
                            newWifiPassword,
                            newStatus
                        })
                    }
                );
                if (response.ok){
                    toast.success("wi-fi changed.");
                    onClosePopUp();
                }else{
                    toast.error("something went wrong.")
                }
            }catch(err){
                console.error(err)
            }
            
            
        }else{
            toast.error("Please Change wi-fi name & password.")
        }
       
        //  wfn:abcd,wfp:1235678
    }else{
        toast.error("wait to connecting...")
    }
}
console.log(deviceData)
  return (
    <div>
        <div className={` bg-gray-800  w-full  `}>
        <div className="flex justify-end px-5 py-5">
                    <button onClick={onClickPopUp}
                     className="text-white bg-blue-600 px-10 py-2 rounded-md hover:bg-gray-500">Wi-Fi Set UP</button>
                </div>
            <div className='pt-10 grid grid-cols-[35%_20%_40%] pb-20'>
                <div className="px-7 mx-10 pt-3 pb-3 bg-gradient-to-tl from-gray-800 to-blue-600 text-white rounded-lg shadow-lg shadow-black duration-500   hover:bg-gradient-to-br hover:shadow-black hover:shadow-xl  hover:from-blue-500 w-4/5 hover:to-gray-800">
                    <div className="w-full grid place-items-start my-3 mx-4">
                        <label>Device Name</label>
                        <div className="px-10 bg-gray-700 shadow-inner shadow-black rounded-md py-2">
                          {deviceData?.deviceName}  
                        </div>
                    </div>
                    <div className="w-full flex justify-start my-3">
                        <span className="mx-4 text-start">
                            <label>Topic Path</label>
                            <div className="px-10 bg-gray-700 shadow-inner shadow-black rounded-md py-2">
                            {deviceData?.devicePath}  
                            </div> 
                        </span>
                        <span className="mx-4 text-start">
                            <label className="">Type</label>
                            <div className="px-10 bg-gray-700 shadow-inner shadow-black rounded-md py-2">
                            {deviceData?.deviceType}  
                            </div> 
                        </span>
                    </div>
                    <div className="w-full grid place-items-start mx-4 my-3">
                        <label>Device ID</label>
                        <div className="px-5 bg-gray-700 shadow-inner shadow-black rounded-md py-2">
                          {deviceData?.deviceId}  
                        </div>
                    </div>
                    <div className="w-full grid place-items-start mx-4 my-3">
                        <label>Status</label>
                        <div className="px-5 bg-gray-700 shadow-inner text-green-500 font-bold shadow-black rounded-md py-2">
                          {deviceData?.status}  
                        </div>
                    </div>
                    <div className="w-full grid place-items-start mx-4 my-3">
                        <label>Description</label>
                        <div className="px-5 bg-gray-700 shadow-inner   shadow-black rounded-md py-2">
                          {"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used"}  
                        </div>
                    </div>
                </div>
                <div></div>
                <div className={`bg-gradient-to-br from-blue-700 to-gray-700 shadow-lg shadow-black w-4/5 border-4 h-80 rounded-full  `}>
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
        {popUp_click  == true && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-15"
        onClick={onClosePopUp}>
        <div className="bg-gray-800 px-12 py-10 rounded-lg w-3/10 z-100 grid place-items-center " onClick={(e)=> e.stopPropagation()}>
                <h1 className='text-white text-3xl text-center shadow-md shadow-black bg-gray-900 rounded-md px-10 py-2 w-3/5'>
                    Wi-fi  Setup
                </h1>
                <div className='px-5 pt-10 grid space-y-10 w-4/5'>
                    <div className='grid grid-cols-2'>
                        <label className='text-white text-xl '>Wi-fi Name : </label>
                        <input type='text' className='pl-2 py-1 rounded-lg shadow-inner shadow-black bg-gray-400 text-white text-xl' name='wf_name'
                        defaultValue={wifiData?.wifiName} onChange={(e)=>{setWifiName(e.target.value)}} value={wifiName}/>   
                    </div>
                    <div className='grid grid-cols-2'>
                        <label className='text-white text-xl' >Password : </label>
                    <input name='wf_pw' type='text' className='pl-2 py-1 shadow-inner shadow-black rounded-lg bg-gray-400 text-white text-xl'
                    defaultValue={wifiData?.wifiPassword} onChange={(e)=>{setWifiPW(e.target.value)}} value={wifiPW} />
                    </div>
                    <div className="flex justify-center w-full gap-5">
                        <button onClick={handleEdit}
                    className='bg-gradient-to-r from-gray-700 px-12 to-blue-700 rounded-md shadow-md py-2 shadow-gray-900 hover:to-gray-800 hover:from-blue-900 text-white font-bold text-2xl '>Change</button>
                    <button onClick={onClosePopUp}
                    className='bg-gray-600 shadow-md px-14 hover:bg-gray-800 py-2 rounded-md shadow-gray-900 text-white font-bold text-2xl '>Cancel</button> 
                    </div>
                   
                </div>
        </div>
     </div>
    )}
    </div>
  )
}