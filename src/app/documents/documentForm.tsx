"use client";

import React, { useState,useEffect } from 'react'

export default function DocumentForm() {
  const [isLoading , setLoading] = useState<boolean>(false);
  useEffect(()=>{
    setLoading(true)
  },[])
  return (
    <div className='w-full  bg-gray-700'>
      <div className='grid place-items-center pb-20'>
        <h1 className={`text-4xl py-6 text-center duration-1000  ${isLoading ? 'rounded-lg text-white px-20 bg-gray-800 my-5' :'opacity-0 px-0'}`}>
          Documentetion
        </h1>
      </div>
    </div>
  )
}
