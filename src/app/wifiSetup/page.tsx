'use client'

import { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [bool, setBoole] = useState(false);
  const [test,setTest] = useState(false)
  useEffect(() => {
    // ทำคำสั่งต่าง ๆ ที่นี่
    console.log("เพิ่ม count + 1");
    setCount((prevCount) => prevCount + 1);

    return function cleanup() {
      // ทำการ cleanup ที่นี่
      setCount(0);
      console.log("clear count เป็น 0");
    };
  }, [bool]);


  return (
    <div>
      <button className="px-10 py-3 text-center bg-gray-800 text-white" onClick={() => setBoole((prevBool) => !prevBool)}>
        {count} click + 1
      </button>


      <h1 className="px-10 py-3 text-center bg-gray-800 text-white my-10">Wow</h1>
      <button className="px-10 py-3 text-center bg-green-600 text-white" onClick={()=>setTest((test)=>!test)}>
        Test
      </button>
      {test? (
        <div>
          Yes
        </div>
      )
      :(
        <div>
          No
        </div>
      )}
    </div>
  );
}

