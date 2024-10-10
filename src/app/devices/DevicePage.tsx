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

interface ProductData{
  _id:string;
  productId:string;
  pruductPassword:string;
  productType:string;
  productPath:string;
  status:string;
}

type Props ={
  user : Session['user'];
}


const getDeviceByUser = async (id:string)=>{
  const response = await fetch(`http://localhost:3000/api/deviceByUser/${id}`)

  return await response.json();
}

const getAllProducts = async ()=>{
  const response = await fetch(`http://localhost:3000/api/products`)

  return await response.json();
}




export default function DevicePage({user}:Props) {
  const userId = user?.id
  const [popUp_click , setPopUpClick] = useState<boolean>();
  const [loading_state , setLoading] = useState<boolean>(false);

  const [devices , setDevices] = useState<DeviceData[]>([])
  const [products , setProducts] = useState<ProductData[]>([])
  const [device_type , setDevicType] = useState<string>('');
  const [device_name , setDeviceName] = useState<string>('');
  const [device_id , setDeviceId] = useState<string>();
  const [product_id ,setProductId] = useState<string>('');
  const mock_productId = [1001, 1002, 1003];  
  let a =''
  useEffect(()=>{
    getDeviceByUser(String(userId)).then((data:any)=>{
      setDevices(data)
    })
    getAllProducts().then((item)=>{
      setProducts(item);
    })
  },[])



  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setDevicType(e.target.value)
  }
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setDeviceName(e.target.value)
  }

  const onClickPopUp=()=>{
    setPopUpClick(true);
    setDevicType('');
    setDeviceName('');
    setProductId('');
  }
  const setLoadingButton=()=>{
    setLoading(true)
  }
  const unsetLoadingButton=()=>{
    setLoading(false)
  }
  const onClosePopUp=()=>{
    setPopUpClick(false)
  }
  const addDeviceSubmit = async()=>{
    let err = ''
    let newStatus = ''
    setLoadingButton();
    if(!device_name){
      toast.error("Please Set Device Name into Your Device.")
    }
    
    if(device_type == "None" || device_type.length==0){
      toast.error("Please Select Type into Your Device.")
    }
    console.log("Products : ",products);
    console.log("find by : ",product_id)
    
    let productId_list: string[] =[]
    let productPath_list: string[] =[]
    let status_list: string[] =[]
    let productType_list: string[] =[]
    let productPassword_list : string[] =[]
    let IdProduct_list: string[]=[] 

    let productPath =''
    let productPasswords = ''
    let IdProduct = ''

    products?.forEach((items:any)=>{
      productId_list.push(items.productId)
      productPath_list.push(items.productPath)
      productType_list.push(items.productType)
      status_list.push(items.status)
      productPassword_list.push(items.productPassword)
      IdProduct_list.push(items._id)
    })
    //check products storage data
    console.log("List : ",productId_list)
    for (let i = 0 ; i <productId_list.length ; i++){
      if (String(product_id) == productId_list[i]){
        if(status_list[i] == "none"){
          err='none'
          newStatus = 'owner'
          productPath = productPath_list[i]
          productPasswords = productPassword_list[i]
          IdProduct = IdProduct_list[i]
        }else if (status_list[i] == 'owner'){
          err='owner'
        }
      }
    }
    if(product_id.length<2 || err ==''){
      toast.error("Require Serial ID.")
    }
    if(err == "owner"){
      toast.error("product is already exist user.")
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
        let devicePath = productPath
        let deviceType = device_type
        let deviceOwner = userId
        let productPassword = productPasswords
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
        
        const resProduct = await fetch(`http://localhost:3000/api/products/${product_id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newStatus
          }),
        });

        if (res.ok && resWifi.ok && resProduct.ok) {
          unsetLoadingButton();
          onClosePopUp();
          toast.success("Add success.")
        }else {
          toast.error("Failed to add a device");
        }
      } catch (error) {
        toast.error("Errors.");
      }
    }else{
      unsetLoadingButton();
      onClosePopUp();
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
            <Link href={"/products/"+item.deviceType+"/"+item.deviceId} key={item.deviceId} className='px-7 py-8 bg-gradient-to-tl from-gray-800 to-blue-600 text-white rounded-lg shadow-lg shadow-black duration-500   hover:bg-gradient-to-br hover:shadow-black hover:shadow-xl  hover:from-blue-500 hover:to-gray-800' >
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
          <div className="flex justify-normal">
            {loading_state == false ? (
                <button  onClick={()=>{addDeviceSubmit()}} className="bg-blue-600 hover:bg-blue-900 text-white text-xl px-5 py-4 rounded-md mx-10" >
                Submit
              </button>
              ):
              (
              <div>
                <button disabled className="bg-blue-600 hover:bg-blue-900 text-white text-xl px-6 py-4 rounded-md mx-10 flex" >
                  <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="pl-2">Submit</span>
                </button>
                </div>
              )
            }
           
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
