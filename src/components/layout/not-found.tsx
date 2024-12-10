import React from 'react'
import LogoWithBrand from '@/components/common/LogoWithBrand'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function NotFoundPage() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-pink-100 p-4">
                <div className="w-full max-w-md text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-md mb-8">
                        <LogoWithBrand />
                    </div>

                    <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>

                    <p className="text-xl text-gray-600 mb-8">
                        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>

                    <div className="space-y-4">
                        <Button asChild className="w-full bg-[#FF66A1] hover:bg-[#FF4D91]">
                            <Link href="/">Go to Home</Link>
                        </Button>

                        <Button asChild variant="outline" className="w-full border-[#FF66A1] text-[#FF66A1] hover:bg-[#FF66A1] hover:text-white">
                            <Link href="/login">Log In</Link>
                        </Button>
                    </div>

                    <div className="mt-12">
                        <p className="text-gray-600">
                            Need help?{' '}
                            <Link href="#" className="font-medium text-[#FF66A1] hover:underline">Contact Support</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}