'use client'
import { Bell, Camera, ChevronDown, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProfileDropdown from "@/components/layout/ProfileDropdown"
import { useRouter } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <div className="flex z-[60] bg-white flex-col h-screen fixed w-screen top-0 left-0">
            <header className="flex h-[80px] items-center justify-between px-10 py-5 bg-white border-[#E5E5E5] border-b">
                <h1 className="text-2xl leading-[20px] font-bold text-logo " >fresha</h1>
                <div className="flex items-center gap-[10px] ">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <ProfileDropdown>
                        <Avatar className=' w-10 h-10 '>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="PP" />
                            <AvatarFallback>PP</AvatarFallback>
                        </Avatar>
                    </ProfileDropdown>
                </div>
            </header>
            <div className=" p-10 pb-5 flex h-h-screen-minus-80 flex-col ">
                <div className="flex justify-between items-start border-b border-zinc-200 pb-5 ">
                    <div>
                        <h2 className="text-2xl font-bold">Edit Your Team Member Profile</h2>
                        <p className="text-gray-500">Manage the personal profiles of your team members.</p>
                    </div>
                    <Button onClick={() => router.push('/team/teammember')} variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                {children}
            </div>
        </div>
    )
}