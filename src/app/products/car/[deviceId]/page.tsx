import React from 'react'
import FormPage from './formPage'


  
export default function page({ params }: { params: { deviceId: string }}) {
  return (
    <div>
        <FormPage device_id={params.deviceId} />
    </div>
  )
}
