'use client'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SuccessPublication() {
    const router = useRouter();
    return (
        <div onClick={() => router.push('/login')} className="flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-white">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Successful</h1>
            <p className="text-gray-600 text-center">
                Congratulations! Your account has been registered.
            </p>
        </div>
    )
}