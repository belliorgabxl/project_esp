import React from 'react'
import { Button, Navbar, NavbarBrand, NavbarContent} from '@nextui-org/react'
import Link from 'next/link'
import NavLink from './NavLink'
import { auth } from '@/auth'
import UserMenu from './UserMenu'

export default async function TopNav() {
    const session = await auth();
  return (
    <Navbar maxWidth='xl' className='bg-gradient-to-r  from-blue-800 to-gray-800'
    classNames={ {
      item: [
        'text-xl',
        'text-white',
        'uppercase',
        'data-[active=true]:text-yellow-200'
      ]
    }}>
      <NavbarBrand as={Link} href='/'>
        <div className='text-4xl font-bold text-white px-5'>
            IOT
        </div>
      </NavbarBrand>
      <NavbarContent justify='center' className='gap-0'>
        <NavLink href='/documents' label='Document'/>
        <NavLink href='/devices' label='Device'/>
        <NavLink href='/aboutus' label='About Us'/>
      </NavbarContent>
      <NavbarContent justify='end'>
        {session?.user? (
            <UserMenu user={session.user}/>
      ):(
        <>
            <Button as={Link} href='/login' variant='bordered' className='text-white py-5 text-xl px-6 hover:bg-blue-600'>
                Login
            </Button>
            <Button as={Link} href='/register' variant='bordered' className='text-white py-5 px-6 text-xl  hover:bg-blue-600'>
            Register
            </Button>
        </>
      )}
      </NavbarContent>
    </Navbar>
  )
}
