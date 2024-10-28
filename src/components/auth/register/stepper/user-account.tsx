'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import { useLocalstorage } from '@/lib/helpers'
import { useRegisterOrganization } from '@/api/auth/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRegisterSchema } from '@/validation-schema/user-register.schema'
import { z } from 'zod'

export default function UserAccount() {
    const [agreeTerms, setAgreeTerms] = useState(false);
    const router = useRouter();
    const { getData } = useLocalstorage();
    const name = getData('name');
    const services = JSON.parse(getData('services'));
    const email = getData('email');
    const address = "Yangon";
    const { mutate, isPending } = useRegisterOrganization();
    const form = useForm({
        resolver: zodResolver(UserRegisterSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            password: '',

        }
    });

    const handleSubmitUser = (values: z.infer<typeof UserRegisterSchema>) => {
        // Handle account creation logic here
        const payload = {
            name: name,
            email: email,
            firstName: values.firstName,
            lastName: values.lastName,
            address: address,
            types: services,
            password: values.password
        }
        console.log(payload);
        mutate(payload, {
            onSuccess: () => {
                router.push('/login');
            }
        })

    }

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <Button onClick={() => router.back()} variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div></div>
            </div>


            <div className="mx-auto max-w-2xl">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create a new business account</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitUser)} className="mt-8 space-y-6">
                        <FormInput
                            form={form}
                            name='firstName'
                            label='First name'
                            placeholder='Enter your first name'
                        />
                        <FormInput
                            form={form}
                            name='lastName'
                            label='Last Name'
                            placeholder='Enter your last name'
                        />
                        <FormInput
                            form={form}
                            name='password'
                            type="password"
                            label='Password'
                        />
                        {/* <FormInput
                            form={form}
                            name='phone'
                            label='Phone Number'
                            type='number'
                        /> */}
                        <div className="flex items-center">
                            <Checkbox
                                id="agreeTerms"
                                checked={agreeTerms}
                                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                            />
                            <Label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">
                                I agree to the Privacy policy, Terms of Service and Terms of Business
                            </Label>
                        </div>
                        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={(!agreeTerms || isPending)}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Create account'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>

        </>
    )
}