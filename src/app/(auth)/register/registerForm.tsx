"use client"
import { registerUser } from '@/app/actions/authActions';
import { RegisterSchema } from '@/lib/schemas/registerSchema';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function RegisterForm() {
    const router =  useRouter();
    const {register , handleSubmit,setError,formState:{errors,isSubmitting}} = useForm<RegisterSchema>({
        // resolver:zodResolver(registerSchema),
        mode: 'onTouched'
    }) ;
    const onSubmit = async (data:RegisterSchema) =>{
        const result = await registerUser(data);
        if (result.status === 'success'){
            toast.success("Register Success.")
            router.push('/login') 
        }else{
            if (Array.isArray(result.error)){
                result.error.forEach((e:any)=>{
                    const fieldName = e.path.join('.') as 'email' | 'name' | 'password' ;
                    setError(fieldName , {message:e.message})
                })
            }else{
                setError('root.serverError',{message :result.error});
            }
        }
    }
  return (
    <Card  className="w-2/5 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
            <div className="">
                <h1 className="text-3xl font-bold text-centerf">Register</h1>
                <p className="text-neutral-500">welcom to nextmatch</p>
            </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <Input
                    defaultValue=""
                    label='Username'
                    variant="bordered"
                    {...register('name')}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    />
                    <Input
                    defaultValue=""
                    label='Email'
                    variant="bordered"
                    {...register('email')}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    />
                    <Input
                    defaultValue=""
                    label='Password'
                    variant="bordered"
                    type="password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    />
                    {
                        errors.root?.serverError && (
                            <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                        )
                    }
                    <Button isLoading={isSubmitting}
                     fullWidth type="submit" className="bg-gradient-to-r from-gray-800 to-blue-700 text-white font-bold text-2xl">
                        Register
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>
  )
}

