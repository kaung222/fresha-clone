import Link from 'next/link'
import { Button } from "@/components/ui/button"
import LogoWithBrand from '../common/LogoWithBrand'

export default function StartOptionPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-brandColorLight p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-md mb-4">
                        <LogoWithBrand />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Our App</h2>
                    <p className="text-gray-600">Choose an option to get started</p>
                </div>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-6 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-lg font-medium text-gray-900">Already have an account?</h3>
                            <Button asChild className="w-full bg-[#FF66A1] hover:bg-[#FF4D91]">
                                <Link href="/login">Login</Link>
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-lg font-medium text-gray-900">New to our app?</h3>
                            <Button asChild variant="outline" className="w-full border-[#FF66A1] text-[#FF66A1] hover:bg-[#FF66A1] hover:text-white">
                                <Link href="/email-confirm">Sign Up</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        {/* <p className="text-xs text-center text-gray-500">
                            By continuing, you agree to our{' '}
                            <a href="#" className="font-medium text-[#FF66A1] hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="font-medium text-[#FF66A1] hover:underline">Privacy Policy</a>.
                        </p> */}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Need help?{' '}
                        <a href="/contact" className="font-medium text-[#FF66A1] hover:underline">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

