import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const AccountSetting = (props: Props) => {
    return (
        <>
            <main className="flex-1 p-6 h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2">Settings</h2>
                <p className="text-gray-600 mb-6">
                    Keep your account secure and manage your personal information and social logins.
                </p>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Personal info</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Legal Name</label>
                            <p className="mt-1">Pyae PhyoNyo</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mobile number</label>
                            <div className="flex items-center mt-1">
                                <p>+95 *******3536</p>
                                <Button variant="ghost" size="sm" className="ml-2">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="flex items-center mt-1">
                                <p>p******7@gmail.com</p>
                                <Button variant="ghost" size="sm" className="ml-2">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className=' mb-6 '>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="border-b pb-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Password</h2>
                                    <p className="font-mono">••••••••••</p>
                                </div>
                                <Button variant="outline">Change password</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h2 className="text-lg font-semibold mb-1">Social logins</h2>
                                <p className="text-gray-500 mb-4">
                                    Manage the social logins you use to access to Fresha.
                                </p>
                            </div>

                            <div className="flex justify-between items-center py-4 border-b">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/placeholder.svg?height=24&width=24"
                                        alt="Google"
                                        width={500}
                                        height={400}
                                        className="w-6 h-6"
                                    />
                                    <div>
                                        <h3 className="font-medium">Google</h3>
                                        <p className="text-sm text-gray-500">Not connected</p>
                                    </div>
                                </div>
                                <Button variant="outline">Connect</Button>
                            </div>

                            <div className="flex justify-between items-center py-4">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/placeholder.svg?height=24&width=24"
                                        alt="Apple"
                                        width={500}
                                        height={400}
                                        className="w-6 h-6"
                                    />
                                    <div>
                                        <h3 className="font-medium">Apple</h3>
                                        <p className="text-sm text-gray-500">Not connected</p>
                                    </div>
                                </div>
                                <Button variant="outline">Connect</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Delete account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">
                            You will delete all your personal info and won&apos;t be able to retrieve it. Are you sure you want to delete your account?
                        </p>
                        <Button variant="destructive">
                            Delete your account
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}

export default AccountSetting