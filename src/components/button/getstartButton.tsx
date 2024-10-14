"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
type Props = {
  isLoading: boolean;
};

export default function GetstartButton({ isLoading }: Props) {
  return (
    <Link
      href="/devices"
      className={`mt-4  text-3xl text-white    py-3
        rounded-lg shadow-lg  shadow-gray-950 hover:px-20 duration-500 ${
          isLoading == true
            ? "bg-gradient-to-r px-32 from-gray-800 animate-pulse  to-blue-600 "
            : "opacity-0"
        }`}
    >
      GetStart
    </Link>
  );
}
