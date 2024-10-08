"use client"
import { randomUUID } from "crypto";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';


interface DeviceData{
  deviceId:string,
  deviceLenght:number,
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

type Props ={
  user : Session['user'];
}

const fetchData = async ()=>{
  const res = await fetch(`http://localhost:3000/api/devices`)

  return await res.json();
}

const getDeviceByUser = async (id:any)=>{
  const response = await fetch(`http://localhost:3000/api/deviceByUser/${id}`)

  return await response.json();
}



export default function DevicePage({user}:Props) {
  const userId = user?.id
  const [popUp_click , setPopUpClick] = useState<boolean>();
  const [devices , setDevices] = useState<DeviceData[]>(
    []
  )

  const mock_productId = [1001, 1002, 1003];  

  useEffect(()=>{
    getDeviceByUser(userId).then((data:any)=>{
      setDevices(data)
    })
  },[])
  console.log(devices)


  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setDevicType(e.target.value)
  }
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setDeviceName(e.target.value)
  }
  const [device_type , setDevicType] = useState<string>('');
  const [device_name , setDeviceName] = useState<string>('');
  const [device_id , setDeviceId] = useState<string>();
  const [product_id ,setProductId] = useState<string>('');

  const onClickPopUp=()=>{
    setPopUpClick(true);
    setDevicType('');
    setDeviceName('');
    setProductId('');
  }
  const onClosePopUp=()=>{
    setPopUpClick(false)
  }
  const addDeviceSubmit = async()=>{
    let err = ''
    if(!device_name){
      toast.error("Please Set Device Name into Your Device.")
    }
    
    if(device_type == "None" || device_type.length==0){
      toast.error("Please Select Type into Your Device.")
    }

    for(let i = 0 ; i < mock_productId.length ; i++ ){
      if(Number(product_id) == mock_productId[i]){
        err='none'
        console.log("have data")
      }
    }
    if(!product_id || err ==''){
      toast.error("Please Entry Product Serial ID.")
    }
    if (device_name.length>1 && device_type.length>1 && device_type!= "None" && err =='none'){
      const uuid = uuidv4();
      const wifiUUID = uuidv4();
      setDevices((item:any) => {
        const updatedInventory = item && [...item,{deviceLenght: devices.length+1 ,deviceId:uuid,devicName:device_name,deviceType:device_type}]
        return updatedInventory;
      }) 
      try {
        let deviceId = uuid
        let deviceName = device_name
        let devicePath = device_type+'/esp32'
        let deviceType = device_type
        let deviceOwner = userId
        let productPassword = '1234'
        let productId = Number(product_id)
        let status = "owner"
        let wifiId = wifiUUID;
        let wifiConnect = 'none'
        let description = ''
        let actionId = 1001
        const res = await fetch("http://localhost:3000/api/devices", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            deviceId,
            deviceName,
            devicePath,
            deviceType,
            deviceOwner,
            productPassword,
            productId,
            status,
            wifiId,
            wifiConnect,
            description,
            actionId
          }),
        });
        let wifiName = "Default"
        let wifiPassword = "12345678"
        status = "none"
        actionId = 0
        const resWifi = await fetch("http://localhost:3000/api/wifi", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            wifiId,
            wifiName,
            wifiPassword,
            status,
            actionId
          }),
        });

        if (res.ok && resWifi.ok) {
          onClosePopUp();
          toast.success("Add success.")
        }else {
          toast.error("Failed to add a device");
        }
      } catch (error) {
        toast.error("Errors.");
      }
    }
  }
  return (
    <div>
    <div className={`bg-gray-800  w-full pb-80`}>
      <div className="flex justify-end ">
        <button className="bg-blue-600 rounded-md hover:bg-slate-600  shadow-md shadow-black text-white px-10 py-4 my-5 mx-5" onClick={onClickPopUp}>+ Add Device</button>
      </div>
      <div className='flex justify-center pt-5 mb-20'>
        {devices.length >0 ? (
        <div className='grid grid-cols-3 gap-5 w-9/10  px-20 py-10 bg-gray-700 border-2 border-dotted border-gray-500'>
          {devices?.map((item:DeviceData)=>(
            <Link href={"/devices/"+item.deviceType+"/"+item.deviceId} key={item.deviceId} className='px-7 py-8 bg-gradient-to-tl from-gray-800 to-blue-600 text-white rounded-lg shadow-lg shadow-black duration-500   hover:bg-gradient-to-br hover:shadow-black hover:shadow-xl  hover:from-blue-500 hover:to-gray-800' >
                <div className="text-2xl font-bold bg-gray-800 rounded-md shadow-md shadow-gray-800 px-5 py-3 w-4/5 text-slate-300">{item.deviceType.toUpperCase()}</div>
              <div className="my-6">
                <span className="font-bold text-2xl text-white">Device Name :</span>
                <span className="text-white mx-4 bg-gray-500 rounded-md shadow-inner shadow-gray-800 py-2 text-xl px-6">{item.deviceName ?? "Loading..."}</span>             
              </div>
              <div className="my-6">
                <span  className="font-bold text-2xl text-white ">ID :</span >
                <span  className="text-white mx-4 bg-gray-500 rounded-md shadow-inner shadow-gray-800 py-2 text-xl px-6">{item.deviceId.slice(0,20) ?? "Loading"}...</span > 
              </div>
            </Link>
          ))}
        </div>
        ) : (
          <div className='grid text-white text-3xl  place-items-center w-9/10 px-80 py-20 bg-gray-700 mb-80 border-2 border-dashed border-gray-500'>
            No Devices
          </div>
        )}
      </div>
    </div>
    {popUp_click  == true && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-35"
        onClick={onClosePopUp}>
        <div className="bg-gray-800 px-12 py-14 rounded-lg w-2/5 z-100 " onClick={(e)=> e.stopPropagation()}>
         <div className="text-2xl  text-white text-center grid ">
         <select id="addDevice" onChange={handleChangeType} 
         className="bg-gray-500 border-2 w-3/5 px-5 py-3 border-black rounded-md" >
             <option value='None'>None-selected</option>
             <option value='car'>Car</option>
             <option  value='pump'>Pump</option>
             <option  value='mechanic arm'>Mechanic Arm</option>
             <option  value='camera'>Camera</option>
           </select>
         </div>
         <div className="my-10">
             <label className="text-2xl text-white mx-3 ">Device Name :</label>
             <input type="text" onChange={handleChangeName} 
             value={device_name} 
             className=" text-2xl text-white  bg-gray-500 rounded-md py-3 px-2 w-2/5"/>
         </div>
         <div className="my-10">
             <label className="text-2xl text-white mx-3 ">Serial ID :</label>
             <input type="text" onChange={(e)=>setProductId(e.target.value)} 
             value={product_id} 
             className=" text-2xl text-white  bg-gray-500 rounded-md py-3 px-2 w-2/5"/>
         </div>
          <div>
            <button onClick={()=>{addDeviceSubmit()}} className="bg-blue-600 hover:bg-blue-900 text-white text-xl px-5 py-4 rounded-md mx-10" >
              Submit
            </button>
            <button className="bg-red-500 hover:bg-red-700 mx-10 text-white text-xl px-5 py-4 rounded-md" onClick={onClosePopUp}>
              Cancel
            </button>
           </div>
        </div>
     </div>
    )}
  </div>
  )
}
