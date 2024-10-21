"use client";

import CRSProducts from "@/components/CLS/CRSProducts";
import ProductHeader from "@/components/headers/productHeader";
import React, { useEffect, useState } from "react";
import ProductDetail from "./productDetail";

export default function Products() {
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="w-full pb-20 bg-gray-700 py-10">
      <div className="flex justify-center">
        <ProductHeader isLoading={isLoading} />
      </div>
      {/* for the product */}
      <div className="mx-10 grid grid-cols-[40%_60%]  my-10">
        <ProductDetail isLoading={isLoading} />
        <div className="px-10 flex justify-center ml-5 py-5 bg-gray-600 border-gray-800 rounded-xl border-4 shadow-md  shadow-gray-900 ">
          <CRSProducts isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
