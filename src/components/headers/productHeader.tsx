"use client"

type Props= {
    isLoading:boolean;
}

export default function ProductHeader({isLoading}:Props) {
  return (
        <div className={` duration-1000 text-3xl font-bold ${isLoading ? 'text-white  bg-gray-900 shadow-gray-900 shadow-md  w-3/4 text-center py-4 rounded-lg':'opacity-0 px-0'}`}>
          Production
        </div>

  )
}
