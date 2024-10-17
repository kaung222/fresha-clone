'use client'
import { useState } from 'react'
import { ArrowLeft, Bell, ChevronDown, Eye, Globe, Mail, Search, Settings, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SettingsPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white border-b px-4 py-2 flex items-center justify-between">
                <h1 className="text-xl font-bold">fresha</h1>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-100 text-purple-600">PP</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            <div className="flex flex-1">
                <aside className="w-64 bg-white border-r p-4">
                    <Button variant="link" className="mb-4 text-purple-600">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <h2 className="font-semibold mb-2">Your account</h2>
                    <nav className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start">
                            <Search className="mr-2 h-4 w-4" />
                            My profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Star className="mr-2 h-4 w-4" />
                            Reviews
                        </Button>
                        <Button variant="ghost" className="w-full justify-start bg-gray-100">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Globe className="mr-2 h-4 w-4" />
                            Workspaces
                        </Button>
                    </nav>
                </aside>

                <main className="flex-1 p-6">
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

                    <div className="bg-white rounded-lg shadow p-6">
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
                </main>

                <aside className="w-64 bg-white border-l p-4">
                    <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-100 text-purple-600">PP</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Pyae PhyoNyo</p>
                        </div>
                    </div>

                    <Button className="w-full mb-4 bg-purple-600 hover:bg-purple-700 text-white">
                        <Mail className="mr-2 h-4 w-4" />
                        Verify your email address
                    </Button>

                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                Profile
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Reviews</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Workspaces</DropdownMenuItem>
                            <DropdownMenuItem>Help center</DropdownMenuItem>
                            <DropdownMenuItem>English GB</DropdownMenuItem>
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </aside>
            </div>
        </div>
    )
}