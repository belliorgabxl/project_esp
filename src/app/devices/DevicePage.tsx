import Link from "next/link";


export default function DevicePage() {
  return (
    <div>
    <div className={`bg-gray-700  w-full h-screen `}>
      <div className='flex justify-center pt-20'>
        <div className='flex justify-center gap-4'>
          <Link href={'/devices/car'} className='px-7 py-8 bg-blue-700 text-white rounded-lg shadow-md shadow-slate-600 duration-500 hover:px-9  hover:bg-gradient-to-tr hover:from-blue-600 hover:to-gray-800'>
            Car
          </Link>
          <Link href={'/car'}  className='px-7 py-8 bg-blue-700 text-white rounded-lg shadow-md shadow-slate-600 duration-500 hover:px-9  hover:bg-gradient-to-tr hover:from-blue-600 hover:to-gray-800'>
            Mechanic Arm
          </Link>
          <Link href={'/car'}  className='px-7 py-8 bg-blue-700 text-white rounded-lg shadow-md shadow-slate-600 duration-500 hover:px-9  hover:bg-gradient-to-tr hover:from-blue-600 hover:to-gray-800'>
            Pump
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}
