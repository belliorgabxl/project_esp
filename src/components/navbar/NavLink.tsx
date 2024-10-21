'use client';
import { NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'


type Props = {
    href:string;
    label:string;
}

export default function NavLink({href,label}:Props) {
    const pathname = usePathname();
  return (
    <NavbarItem isActive={pathname === href}
     as={Link} href={href} className='hover:bg-blue-600 duration-1000 h-full grid place-items-center px-5'>
        {label}
    </NavbarItem>
  )
}
