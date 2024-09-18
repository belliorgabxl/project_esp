import Link from "next/link";

export default function Home() {
  return (
    <div className=" w-full h-screen bg-gray-700" >
      <div className="flex justify-center pt-32">
        <Link href="/login" className=" px-14 text-3xl text-white bg-gradient-to-r from-gray-800 to-blue-600  py-5
        rounded-2xl shadow-lg animate-pulse shadow-gray-950 hover:px-20 duration-500 ">
          GetStart
        </Link>
      </div>
    </div>
  );
}
