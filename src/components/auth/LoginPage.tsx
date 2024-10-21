'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Mail } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log('Login attempted with:', { email, password })
    }

    return (
        <div className="flex min-h-screen bg-white">
            <div className=" flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-row lg:w-[50%] lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Fresha for professionals</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Create an account or log in to manage your business.
                        </p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                                    Login
                                </Button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">OR</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <Button variant="outline" className="w-full">
                                    <Facebook className="w-5 h-5 mr-2 text-blue-600" />
                                    Continue with Facebook
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Mail className="w-5 h-5 mr-2 text-red-500" />
                                    Continue with Google
                                </Button>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Are you a customer looking to book an appointment?{' '}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Go to Fresha for customers
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-[50%] ">
                <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src="./img/girl.png"
                    alt="Woman using phone and laptop"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    )
}