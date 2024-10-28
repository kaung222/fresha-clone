import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Home, RotateCcw, Trash2 } from 'lucide-react'

export default function BusinessSettings() {
    const [isEditing, setIsEditing] = useState(false)
    const [businessInfo, setBusinessInfo] = useState({
        name: 'Aye Clinic',
        country: 'Myanmar',
        email: 'phwephwe8812@gmail.com',
        phone: '+959 881262757',
        website: 'www.web.com'
    })

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleSave = () => {
        setIsEditing(false)
        // Here you would typically send the updated info to your backend
        console.log('Saving business info:', businessInfo)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setBusinessInfo(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-sm breadcrumbs mb-6">
                <ul>
                    <li>Work space setting</li>
                    <li>Business setting</li>
                </ul>
            </div>

            <div className="flex gap-8">
                <aside className="w-64">
                    <nav className="space-y-1">
                        <div className="font-medium p-2">Business setup</div>
                        <div className="bg-gray-100 text-black p-2 rounded">Business detail</div>
                        <div className="text-gray-600 p-2">Location</div>
                    </nav>
                </aside>

                <main className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">Business details</h1>
                    <p className="text-gray-500 mb-6">
                        Set your business name, tax and language preferences, and manage external links.
                    </p>

                    <div className="space-y-8">
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Business Info</h2>
                                <Button onClick={isEditing ? handleSave : handleEdit} variant="outline">
                                    {isEditing ? 'Save' : 'Edit'}
                                    {!isEditing && <Pencil className="ml-2 h-4 w-4" />}
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="business-name">Business name</Label>
                                    <Input
                                        id="business-name"
                                        name="name"
                                        value={businessInfo.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        value={businessInfo.country}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        value={businessInfo.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Mobile phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={businessInfo.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">External Link</h2>
                            <div>
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    name="website"
                                    value={businessInfo.website}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </section>

                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Location</h2>
                                <Button>
                                    Add
                                    <span className="ml-2">+</span>
                                </Button>
                            </div>
                            <Card>
                                <CardContent className="flex items-center p-4">
                                    <div className="bg-blue-100 p-2 rounded-md mr-4">
                                        <Home className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">Aye Clinic</h3>
                                        <p className="text-sm text-gray-500">
                                            No 109, Letwelthondaya street, 32 Ward, North Dagon Township, Yangon
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" size="icon">
                                            <RotateCcw className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}