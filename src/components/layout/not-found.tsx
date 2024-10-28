import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</p>
                <div className="max-w-md mx-auto">
                    <p className="text-gray-500 mb-8">
                        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild className="bg-black text-white hover:bg-gray-800">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go to Homepage
                        </Link>
                    </Button>
                    <Button variant="outline">Contact Support</Button>
                </div>
            </div>
            <div className="mt-12">
                <svg
                    className="w-48 h-48 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
        </div>
    )
}