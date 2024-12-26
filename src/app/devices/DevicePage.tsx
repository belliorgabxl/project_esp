"use client";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { MqttProvider } from "../connect/MqttContext";
import DeviceStatus from "@/components/Effect/DeviceStatus";
import { useRouter } from "next/navigation";
import { Bolt, CirclePlus, Pen, Settings, Wrench } from "lucide-react";
import AddDevicePopUp from "@/components/popup/AddDevicePopUp";
import EditDevicePopUp from "@/components/popup/EditDevicePopUp";
interface DeviceData {
  deviceId: string;
  deviceLenght: number;
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

interface ProductData {
  _id: string;
  productId: string;
  pruductPassword: string;
  productType: string;
  productPath: string;
  status: string;
}

type Props = {
  user: Session["user"];
};

const getDeviceByUser = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/deviceByUser/${id}`);

  return await response.json();
};

const getAllProducts = async () => {
  const response = await fetch(`http://localhost:3000/api/products`);
  return await response.json();
};

export default function DevicePage({ user }: Props) {
  const userId = user?.id;
  const [popUp_click, setPopUpClick] = useState<boolean>();
  const [edit_popup , setEditPopUp] = useState<boolean>(false);
  const [loading_state, setLoadings] = useState<boolean>(false);

  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [device_type, setDevicType] = useState<string>("not have");
  const [device_name, setDeviceName] = useState<string>("");
  const [product_id, setProductId] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getDeviceByUser(String(userId)).then((data: any) => {
      setDevices(data);
      setLoading(true);
    });
    getAllProducts().then((item: any) => {
      setProducts(item);
    });
  }, []);


  const onClickPopUp = () => {
    setPopUpClick(true);
    setDevicType("");
    setDeviceName("");
    setProductId("");
  };
  const setLoadingButton = () => {
    setLoadings(true);
  };
  const unsetLoadingButton = () => {
    setLoadings(false);
  };
  const onClosePopUp = () => {
    setPopUpClick(false);
  };
  const addDeviceSubmit = async () => {
    let err = "";
    let newStatus = "";
    setLoadingButton();
    if (!device_name) {
      toast.error("Please Set Device Name into Your Device.");
    }

    if (device_type == "None" || device_type.length == 0) {
      toast.error("Please Select Type into Your Device.");
    }
    console.log("Products : ", products);
    console.log("find by : ", product_id);

    const productId_list: string[] = [];
    const productPath_list: string[] = [];
    const status_list: string[] = [];
    const productType_list: string[] = [];
    const productPassword_list: string[] = [];
    const IdProduct_list: string[] = [];

    let productPath = "";
    let productPasswords = "";
    let IdProduct = "";
    let productType = "";
    let productId = "";
    products?.forEach((items: any) => {
      productId_list.push(items.productId);
      productPath_list.push(items.productPath);
      productType_list.push(items.productType);
      status_list.push(items.status);
      productPassword_list.push(items.productPassword);
      IdProduct_list.push(items._id);
    });

    for (let i = 0; i < productId_list.length; i++) {
      if (String(product_id) == productId_list[i]) {
        if (status_list[i] == "none") {
          err = "none";
          newStatus = "owner";
          productPath = productPath_list[i];
          productPasswords = productPassword_list[i];
          IdProduct = IdProduct_list[i];
          productType = productType_list[i];
          productId = productId_list[i];
        } else if (status_list[i] == "owner") {
          err = "owner";
        }
      }
    }
    if (product_id.length < 2 || err == "") {
      toast.error("Require Serial ID.");
    }
    if (err == "owner") {
      toast.error("product is already exist user.");
    }

    if (
      device_name.length > 1 &&
      device_type.length > 1 &&
      device_type != "None" &&
      err == "none"
    ) {
      const uuid = uuidv4();
      const wifiUUID = uuidv4();
      setDevices((item: any) => {
        const updatedInventory = item && [
          ...item,
          {
            deviceLenght: devices.length + 1,
            deviceId: uuid,
            devicName: device_name,
            deviceType: device_type,
          },
        ];
        return updatedInventory;
      });
      try {
        let deviceId = uuid;
        let deviceName = device_name;
        let devicePath = productPath;
        let deviceType = productType;
        let deviceOwner = userId;
        let productPassword = productPasswords;
        let productId = Number(product_id);
        let status = "owner";
        let wifiId = wifiUUID;
        let wifiConnect = "none";
        let description = "";
        let actionId = 1001;
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
            actionId,
          }),
        });
        let wifiName = "Default";
        let wifiPassword = "12345678";
        status = "none";
        actionId = 0;
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
            actionId,
          }),
        });

        const resProduct = await fetch(
          `http://localhost:3000/api/products/${product_id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              newStatus,
            }),
          }
        );

        if (res.ok && resWifi.ok && resProduct.ok) {
          unsetLoadingButton();
          onClosePopUp();
          toast.success("Add success.");
        } else {
          toast.error("Failed to add a device");
        }
      } catch (error) {
        toast.error("Errors.");
      }
    } else {
      unsetLoadingButton();
      onClosePopUp();
    }
  };

  const [triggerSubmit, setTriggerSubmit] = useState<boolean>(false);

  const getAddDevicePopUp = (name: string, id: string) => {
    setDeviceName(name);
    setProductId(id);
    setDevicType("Car");
    setTriggerSubmit(true); // Set a flag to trigger the submission logic
  };

  useEffect(() => {
    if (triggerSubmit) {
      if (!device_name) {
        alert("err");
      } else {
        addDeviceSubmit();
      }
      setTriggerSubmit(false); // Reset the flag
    }
  }, [triggerSubmit, device_name]);

  const router = useRouter();
  const onClickEditPopUp = ()=>{
    setEditPopUp(true)
  }

  return (
    <div>
      <div className={`bg-gray-800  w-full pb-10`}>
        <div className="absolute  text-white bg-gray-900 px-20 py-4 text-3xl my-3 rounded-xl  md:left-1/2 sm:left-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 sm:-translate-x-1/2   left-5 ">
        <div className={` ${isLoading ? "animate-fadeIn" : "opacity-0"} flex justify-center items-center `}>
      <h1 className=" text-5xl font-extrabold text-gray-900 "><span className="text-transparent bg-clip-text tracking-wide bg-gradient-to-r to-blue-800 via-blue-600 from-sky-300 line-clamp-1 ">Devices</span></h1>
      </div>
        </div>

        <div className="lg:flex lg:justify-end sm:grid sm:place-items-end grid place-items-end gap-3 py-5 px-5">
          <button
            className="flex gap-2 justify-center bg-blue-600 rounded-md items-center hover:bg-slate-600  shadow-md shadow-black h-fit text-white w-[180px] px-4 py-2 "
            onClick={onClickPopUp}
          >
              <CirclePlus style={{ width: "1.8rem", height: "1.8rem" }}  className="relative  text-white"/>
            Add Device
          </button>
          <button
            className="flex gap-2 justify-center items-center font-semibold bg-white rounded-md hover:bg-slate-600 hover:text-white  shadow-md shadow-black text-gray-700 w-[180px]  text-lg px-4 py-2 group"
            onClick={() => {
              router.push("/import");
            }}
          >
            <Wrench style={{ width: "2.0rem", height: "1.8rem" }}  className="relative  text-gray-700 group-hover:text-white"/>
            Import
          </button>
        </div>
        <div className="flex justify-center pt-5 mb-20">
          {devices.length > 0 && isLoading == true ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:w-11/12  lg:px-10 px-4 py-10 md:w-9/12 sm:w-9/12 w-full sm:px-10 bg-gray-700 border-2 border-dotted border-gray-500">
              {devices?.map((item: DeviceData) => (
                <div
                  key={item.deviceId}
                  className="px-7 py-5 bg-gradient-to-tl from-gray-800 via-indigo-900 to-blue-600 text-white rounded-2xl shadow-lg shadow-gray-800 duration-500  hover:bg-blue-800 hover:shadow-gray-900 hover:shadow-xl hover:scale-[102%] w-full group "
                >
                  <div
                    className="absolute w-12 h-12 rounded-full z-10 right-0 -top-5 shadow-md shadow-black bg-gray-300 animate-fastFade hidden group-hover:block hover:bg-gray-500 "
                    onClick={() => {
                      onClickEditPopUp();
                    }}
                  >
                    <button
                      className=" w-full h-full grid place-items-center "
                    >
                      <Settings
                        style={{ width: "2.0rem", height: "2.5rem" }}
                        className="text-black hover:scale-[105%] hover:text-white transition-colors"
                      />
                    </button>
                  </div>
                  <Link
                    className=""
                    href={"/products/" + item.deviceType + "/" + item.deviceId}
                  >
                    <div className="w-full flex justify-center">
                      <div className="text-2xl  font-bold bg-gray-800 rounded-xl shadow-sm px-5 py-2 w-4/5 text-center text-slate-300">
                        {item.deviceType.toUpperCase()}
                      </div>
                    </div>

                    <div className="my-4 flex">
                      <span className="w-[80px] font-bold text-xl text-white">
                        Name :
                      </span>
                      <span className="text-white mx-4 bg-gray-500 rounded-md py-1 text-xl px-6">
                        {item.deviceName ?? "Loading..."}
                      </span>
                    </div>
                    <div className=" flex my-4">
                      <span className="font-bold text-xl w-[80px] text-white ">
                        IoT ID :
                      </span>
                      <span className="text-white mx-4 bg-gray-500 rounded-md  h-fit py-1  text-xl w-[250px] line-clamp-1 px-6">
                        {item.deviceId ?? "Loading"}
                      </span>
                    </div>
                    <div className=" flex items-center my-4">
                      <span className="font-bold text-xl w-[100px] text-white ">
                        Status :
                      </span>
                      <MqttProvider topic_device={item.devicePath}>
                        <DeviceStatus />
                      </MqttProvider>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : devices.length <= 0 && isLoading == true ? (
            <div className="grid text-white text-3xl  place-items-center w-9/10 px-80 py-20 bg-gray-700 mb-20 border-2 border-dashed border-gray-500">
              No Devices
            </div>
          ) : (
            <div className="grid text-white text-4xl  place-items-center w-9/10 px-80 py-20 bg-gray-700 animate-pulse text-bold mb-20 border-2 border-dashed border-gray-500">
              Loading...
            </div>
          )}
        </div>
      </div>
      {popUp_click == true && (
        <AddDevicePopUp
          onClosePopUp={() => setPopUpClick(!popUp_click)}
          loading_state={loading_state}
          onSave={getAddDevicePopUp}
        />
      )}
      {edit_popup && (
        <EditDevicePopUp onClosePopUp={()=>{setEditPopUp(false)}}/>
      )}
    </div>
  );
}
