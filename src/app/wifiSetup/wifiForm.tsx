'use client'
import { Button } from '@nextui-org/react'
import React, { FormEvent } from 'react'
import { toast } from 'react-toastify';
import mqtt, { MqttClient } from "mqtt";
import { useEffect , useState } from 'react';

export default function WifiForm() {
    const [client, setClient] = useState<MqttClient | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    useEffect(() => {
        const client = mqtt.connect('wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt', {
            clientId: 'bf71c559-1fb8-447b-b6ca-ef29315b7b67',
            username: "admin",
            password: "Bam1234!",
            protocol: 'wss',
            });
        client.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to HiveMQ broker over WebSocket');
        });
        client.on('error', (err) => {
            console.error('Connection error: ', err.message);
            console.error('Details: ', err);
            client.end();
        });
        setClient(client);
        return () => {
          if (client) {
            client.end();
          }
        };
      }, []);
    const handleEdit = async(event: FormEvent<HTMLFormElement>)=>{
        if (client && isConnected) {
            event.preventDefault();
            const formData = new FormData(event.currentTarget)
            const wfn = formData.get('wf_name');
            const wfp= formData.get('wf_pw')
            toast.success("wi-fi changed.")
            console.log(`wfn:${wfn},wfp:${wfp}`)
            client.publish('esp32/car/control', `wfn:${wfn},wfp:${wfp}`);
        }else{
            toast.error("wait to connecting...")
        }

    }
  return (
    <div className='px-10 py-10 w-full h-screen bg-gray-700'>
        <div className='grid place-items-center '>
            <div className='border-2 px-10 py-10 grid place-items-center'>
                <h1 className='text-white text-3xl text-center border-2 py-2 w-3/5'>
                    Wi-fi  Setup
                </h1>
                <form onSubmit={handleEdit} className='px-10 py-10 grid space-y-10 w-4/5'>
                    <div className='grid grid-cols-2'>
                        <label className='text-white text-lg '>Wi-fi Name : </label>
                        <input type='text' className='pl-2 py-1 rounded-lg' name='wf_name'
                        defaultValue="Jordy"/>   
                    </div>
                    <div className='grid grid-cols-2'>
                        <label className='text-white text-lg '>Password : </label>
                    <input name='wf_pw' type='text' className='pl-2 py-1 rounded-lg'
                    defaultValue="12345678" />
                    </div>
                    <Button type='submit' className='bg-gradient-to-r from-gray-800 to-blue-700 text-white font-bold text-2xl'>Change</Button>
                </form>
            </div>
        </div>
        
    </div>
  )
}
