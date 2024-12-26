import React from 'react'
import Form from './Form'

import { auth } from '@/auth'

export default async function page() {
    const session = await auth();
  return (
    <div>
        <Form user={session?.user}/>
    </div>
  )
}
