"use client"
import { signOutUser } from '@/app/actions/authActions';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react'

type Props = {
    user : Session['user'];
}

export default function UserMenu({user}:Props) {
  return (
    <Dropdown>
        <DropdownTrigger>
            <Avatar isBordered
            as='button'
            className='transition-transform '
            color='secondary'
            name={user?.name || 'user avatar'}
            size='md'
            src={user?.image || '/images/toto.jpg'}
            />
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='User Action Menu'>
            <DropdownSection showDivider>
                <DropdownItem isReadOnly as='span' className='h-14 flex flex-row text-2xl font-bold' aria-label='Username'>
                    Signed in as {user?.name}
                </DropdownItem>
            </DropdownSection>
            <DropdownSection>
                <DropdownItem className='text-2xl font-bold' as={Link} href="/members/edit" >
                    Edit Profile
                </DropdownItem>
                <DropdownItem color='danger' onClick={async() => signOutUser()} >
                    Logout
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
  )
}