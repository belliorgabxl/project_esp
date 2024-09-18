
import Link from "next/link";


export default function Home() {
  return (
    <div className=" w-full h-screen bg-gray-700" >
      <div className="flex justify-center pt-32">
        <Link href="/login" className="px-14 text-3xl text-white bg-gradient-to-r from-gray-800 to-blue-600 animate-pulse py-5
        rounded-2xl shadow-lg shadow-gray-950 ">
          GetStart
        </Link>
      </div>

    </div>
  );
}
