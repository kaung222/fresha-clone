'use client'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SuccessMessage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Successful</h1>
            <p className="text-gray-600 text-center">
                Congratulations! Your password has been changed.
            </p>
            <Link href={'/login'} className=" px-4 py-2 border rounded-lg hover:bg-gray-100 ">Login</Link>
        </div>
    )
}