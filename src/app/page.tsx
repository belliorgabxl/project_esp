import CLShomepage from "@/components/CLShomepage";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" w-full h-screen bg-gray-700">
      <div className="flex justify-center">
        <CLShomepage />
        
      </div>
      <div className="flex justify-center">
        <Link
          href="/devices"
          className="mt-4 px-14 text-3xl text-white bg-gradient-to-r from-gray-800 to-blue-600  py-3
        rounded-2xl shadow-lg animate-pulse shadow-gray-950 hover:px-20 duration-500 "
        >
          GetStart
        </Link>
      </div>
      <div className="grid bg-gray-900 mx-5 rounded-md shadow-md shadow-black my-10 py-10 px-10 w-3/5">
        <h1 className="text-3xl text-white">Our Service</h1>
        <p className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;Provider Iot device and support Iot Control with log monitoring </p>
      </div>
      
    </div>
  );
}
