'use client'
import React from 'react'
import { toast } from 'react-toastify';

export default function Form() {
    
    const copy = (event: React.MouseEvent<HTMLDivElement>) => {
        const value = event.currentTarget.innerText;
        navigator.clipboard.writeText(value);
        toast.success("Copied to clipboard!");
      };
  return (
    <div className='px-20 py-20 w-full bg-gray-700'>
        <button id='text1' onClick={()=>{copy}} className='bg-black w-fit hover:bg-gray-900 cursor-pointer px-10 rounded-lg py-20 grid place-items-center focus:bg-gray-500 text-lg text-white '>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta et tenetur odit corporis maxime aliquid nostrum sapiente ab nulla fugiat voluptas atque aspernatur hic vel accusantium unde, quod laborum error?
        </button> 
    </div>
  )
}
