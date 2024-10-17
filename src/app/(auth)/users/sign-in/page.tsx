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
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold">Fresha for professionals</h1>
            <p className="text-gray-600">Create an account or log in to manage your business.</p>
          </div>
          <form className="mt-8 space-y-4">
            <Input type="email" placeholder="Email" defaultValue="pko553397@gmail.com" />
            <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">Continue</Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">OR</div>
          <div className="mt-6 space-y-4">
            <Button variant="outline" className="w-full">
              <Image src="/placeholder.svg?height=24&width=24" height={24} width={24} alt="Google logo" className="mr-2" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              <Image src="/placeholder.svg?height=24&width=24" height={24} width={24} alt="Apple logo" className="mr-2" />
              Continue with Apple
            </Button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Are you a customer looking to book an appointment?</p>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Go to Fresha for customers
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 text-sm text-gray-600">
          <Image src="/placeholder.svg?height=40&width=40" height={40} width={40} alt="Fresha logo" />
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