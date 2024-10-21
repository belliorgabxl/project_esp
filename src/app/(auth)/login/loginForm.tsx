'use client';
import { signInUser } from "@/app/actions/authActions";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useForm  } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginForm() {
    const router  = useRouter();
    const {register , handleSubmit,formState:{errors,isSubmitting}} = useForm<LoginSchema>({
        resolver:zodResolver(loginSchema),
        mode: 'onTouched'
    }) ;
    const onSubmit = async (data:LoginSchema) =>{
        const result = await signInUser(data);
        if (result.status === 'success'){
            toast.success("Login success")
            router.push('/devices')
            router.refresh();
        }else{
            toast.error(result.error as string)
            console.log(result.error)
        }
    }
  return (
    <Card  className="w-2/5 mx-auto shadow-lg shadow-gray-900">
        <CardHeader className="flex flex-col items-center justify-center">
            <div className="">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <p className="text-neutral-500">Welcom to Internet of thing</p>
            </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
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
                    <Button
                    isLoading={isSubmitting} fullWidth type="submit" className="bg-gradient-to-r from-gray-800 to-blue-700 text-white font-bold text-2xl">
                        Login
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>
  )
}