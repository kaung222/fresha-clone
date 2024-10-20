'use client'
import { useState } from 'react'
import { Building2, Camera, Home, MapPin, MoreHorizontal, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
type AddressType = 'Home' | 'Work' | 'Other'
export default function AddNewClient() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [addressType, setAddressType] = useState<AddressType>('Home')

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }



    return (
        <>
            <div className="flex gap-20 w-full max-h-full h-h-full-minus-96 max-w-[1038px]">
                <div style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex-1 h-full overflow-auto  ">
                    <div className="mb-6 flex justify-center">
                        <div className="relative w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <Camera className="h-8 w-8 text-gray-400" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input id="firstName" required />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email*</Label>
                            <Input id="email" type="email" required />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone number</Label>
                            <Input id="phone" type="tel" />
                        </div>
                        <div>
                            <Label htmlFor="dob">Date of birth</Label>
                            <Input id="dob" type="date" />
                        </div>
                        <div>
                            <Label htmlFor="country">Country</Label>
                            <Select>
                                <SelectTrigger id="country">
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select>
                                <SelectTrigger id="gender">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="pronouns">Pronouns</Label>
                            <Select>
                                <SelectTrigger id="pronouns">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="he/him">He/Him</SelectItem>
                                    <SelectItem value="she/her">She/Her</SelectItem>
                                    <SelectItem value="they/them">They/Them</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">Additional Info</h2>
                        <p className="text-gray-500 mb-6">Manage your client's info.</p>

                        <div className="flex space-x-2 mb-6">
                            <Button
                                variant={addressType === 'Home' ? 'default' : 'outline'}
                                className={addressType === 'Home' ? 'bg-black text-white' : ''}
                                onClick={() => setAddressType('Home')}
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </Button>
                            <Button
                                variant={addressType === 'Work' ? 'default' : 'outline'}
                                className={addressType === 'Work' ? 'bg-black text-white' : ''}
                                onClick={() => setAddressType('Work')}
                            >
                                <Building2 className="mr-2 h-4 w-4" />
                                Work
                            </Button>
                            <Button
                                variant={addressType === 'Other' ? 'default' : 'outline'}
                                className={addressType === 'Other' ? 'bg-black text-white' : ''}
                                onClick={() => setAddressType('Other')}
                            >
                                <MoreHorizontal className="mr-2 h-4 w-4" />
                                Other
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input id="address" className="pl-8" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Select>
                                        <SelectTrigger id="country">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="us">United States</SelectItem>
                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                            <SelectItem value="ca">Canada</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" />
                                </div>
                            </div>
                        </div>
                    </div>



                </div>

                <div className="w-64">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4">1</div>
                            <span className="font-medium">Profile</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mr-4">2</div>
                            <span className="text-gray-500">Address</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
            </div>
        </>
    )
}