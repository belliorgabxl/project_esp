"use client"
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";


interface DeviceData{
  deviceId:number;
  devicName:string;
  devicePath:string;
}


export default function DevicePage() {
  const [popUp_click , setPopUpClick] = useState<boolean>();
  const [devices , setDevices] = useState<DeviceData[]>(
    [
    // {deviceId:1,devicName:"My First Car",devicePath:"car"},
    // {deviceId:2,devicName:"Jordy Arm",devicePath:"mechanic arm"},
    // // {deviceId:3,devicName:"Pump",devicePath:"pump"},
    // // {deviceId:4,devicName:"Device..",devicePath:"car"},
    // // {deviceId:5,devicName:"Device..",devicePath:"car"},
  ]
  )
  const handleChangePath = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setDevicPath(e.target.value)
  }
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setDeviceName(e.target.value)
  }
  const [device_path , setDevicPath] = useState<string>('');
  const [device_name , setDeviceName] = useState<string>('');
  const [device_id , setDeviceId] = useState<string>();
  const onClickPopUp=()=>{
    setPopUpClick(true)
    setDevicPath('')
    setDeviceName('')
  }
  const onClosePopUp=()=>{
    setPopUpClick(false)
  }
  const addDeviceSubmit = ()=>{
    if (device_name.length>1&&device_path.length>1){
      setDevices(item => {
        const updatedInventory = item && [...item,{deviceId: devices.length+1,devicName:device_name,devicePath:device_path}]
        return updatedInventory;
      }) 
      onClosePopUp();
      toast.success("Add success.")
    }else{
      toast.error("Add wrong.")
    }
  }
  
  return (
    <div>
    <div className={`bg-gray-800  w-full pb-80`}>
      <div className="flex justify-end ">
        <button className="bg-blue-600 rounded-md hover:bg-slate-600  shadow-md shadow-black text-white px-10 py-4 my-5 mx-5" onClick={onClickPopUp}>+ Add Device</button>
      </div>
      <div className='flex justify-center pt-5 mb-20'>
        {devices.length > 0  ? (
        <div className='grid grid-cols-3 gap-5 w-9/10 px-20 py-10 bg-gray-700 border-2 border-dotted border-gray-500'>
          {devices?.map((item:DeviceData)=>(
            <Link href={"/devices/"+item.devicePath} key={item.deviceId} className='px-7 py-8 bg-gradient-to-tl from-gray-800 to-blue-600 text-white rounded-lg shadow-lg shadow-black duration-500   hover:bg-gradient-to-br hover:shadow-black hover:shadow-xl hover:from-blue-500 hover:to-gray-800' >
                <div className="text-2xl font-bold bg-gray-800 rounded-md shadow-md shadow-gray-800 px-5 py-3 w-4/5 text-slate-300">{item.devicePath.toUpperCase()}</div>
              <div className="my-3">
                <span className="font-bold text-2xl text-white">Device Name :</span>
                <span className="text-white mx-4 bg-gray-500 rounded-md shadow-inner shadow-gray-800 py-2 text-xl px-6">{item.devicName}</span>             
              </div>
              <div>
                <span  className="font-bold text-2xl text-white ">ID :</span >
                <span  className="text-white mx-4 bg-gray-500 rounded-md shadow-inner shadow-gray-800 py-2 text-xl px-6">{item.deviceId}</span > 
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
         <select id="addDevice" onChange={handleChangePath} 
         className="bg-gray-500 border-2 w-3/5 px-5 py-3 border-black rounded-md" >
             <option value='no-selected'>No-selected</option>
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
// type PopUp = {
//   onClose: () => void;
//   Path : string;
//   Name : string;
// }
// const PopUp = ( {onClose ,Path,Name }:PopUp)=>{
//   const handleChangePath = (e: React.ChangeEvent<HTMLSelectElement>)=>{
//     setDevicPath(e.target.value)
//   }
//   const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>)=>{
//     setDeviceName(e.target.value)
//   }
//     return(
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-15"
//          onClick={onClose}>
//          <div className="bg-gray-800 px-12 py-14 rounded-lg w-2/5 z-100 " onClick={(e)=> e.stopPropagation()}>
//           <div className="text-2xl  text-white text-center grid ">
//           <select id="addDevice" onChange={handleChangePath} 
//           className="bg-gray-500 border-2 w-3/5 px-5 py-3 border-black rounded-md" >
//               <option value='no-selected'>No-selected</option>
//               <option value='car'>Car</option>
//               <option  value='pump'>Pump</option>
//               <option  value='arm'>Mechanic Arm</option>
//               <option  value='camera'>Camera</option>
//             </select>
//           </div>
          
//           <div className="my-10">
//               <label className="text-2xl text-white mx-3 ">Device Name : {device_path}</label>
//               <input type="text" onChange={handleChangeName} 
//               value={device_name} 
//               className=" text-2xl text-white  bg-gray-500 rounded-md py-3 px-2 w-2/5"/>
//             </div>
//             <div>
//               <button onClick={()=>{addDeviceSubmit()}} className="bg-green-500 hover:bg-green-700 text-white text-xl px-5 py-4 rounded-md mx-10" >
//                 Submit
//               </button>
//               <button className="bg-red-500 hover:bg-red-700 mx-10 text-white text-xl px-5 py-4 rounded-md" onClick={onClose}>
//                 Cancel
//               </button>
//             </div>
//          </div>
//       </div>
//     )
//   }