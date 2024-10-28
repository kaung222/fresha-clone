import { Loader2 } from 'lucide-react'

export default function PageLoading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="text-center flex flex-col items-center">
                <Loader2 className="h-16 w-16 animate-spin text-black mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading</h2>
                <p className="text-gray-500">Please wait while we prepare your content...</p>
            </div>
        </div>
    )
}