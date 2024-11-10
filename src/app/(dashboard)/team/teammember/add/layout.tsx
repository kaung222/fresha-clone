'use client'
import { Bell, Camera, ChevronDown, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProfileDropdown from "@/components/layout/ProfileDropdown"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AddTeamMember({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <div className="flex z-[60] bg-white flex-col h-screen fixed w-screen top-0 left-0">
            <header className="flex h-[80px] items-center justify-between px-10 py-5 bg-white border-[#E5E5E5] border-b">
                <Link href={'/dashboard'} className="text-2xl leading-[20px] font-bold text-logo ">fresha</Link>
                <div className="flex items-center gap-[10px] ">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <ProfileDropdown>
                        <Avatar className=' w-11 h-11 '>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="PP" />
                            <AvatarFallback>PP</AvatarFallback>
                        </Avatar>
                    </ProfileDropdown>
                </div>
            </header>
            <div className=" p-10 pb-0 flex h-h-screen-minus-80 flex-col ">
                <div className="flex justify-between items-start pb-5 ">
                    <div>
                        <h2 className="text-2xl font-bold">Add team member</h2>
                        <p className="text-gray-500 hidden lg:block">Manage the personal profiles of your team members.</p>
                    </div>
                    <Link href={'/team/teammember'} className=" px-4 py-2 rounded-lg hover:bg-gray-100 ">
                        <X className="h-6 w-6" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    )
}