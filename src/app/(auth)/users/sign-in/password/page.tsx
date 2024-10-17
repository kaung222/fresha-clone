import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-col justify-between w-full p-8 lg:w-1/2">
                <Link href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Link>
                <div className="max-w-sm mx-auto w-full">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold">Welcome back to your business account, Pyae</h1>
                        <p className="text-gray-600">Enter your password to log in as pko553397@gmail.com</p>
                    </div>
                    <form className="mt-8 space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Input id="password" type="password" placeholder="••••••••" />
                        </div>
                        <Link href="#" className="block text-sm text-blue-600 hover:underline">
                            Forgot your password?
                        </Link>
                        <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">Log in</Button>
                    </form>
                </div>
                <div className="flex flex-col items-center space-y-4 text-sm text-gray-600">
                    <Image src="/placeholder.svg?height=40&width=40" height={40} width={40} alt="Company logo" />
                    <div className="flex space-x-4">
                        <Link href="#" className="hover:text-gray-900">
                            English
                        </Link>
                        <Link href="#" className="hover:text-gray-900">
                            Support
                        </Link>
                        <Link href="#" className="hover:text-gray-900">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2">
                <Image
                    src="/placeholder.svg?height=1080&width=1080"
                    width={1080}
                    height={1080}
                    alt="Professional using a tablet"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    )
}