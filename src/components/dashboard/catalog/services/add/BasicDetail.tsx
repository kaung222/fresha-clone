'use state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

type Props = {}

const BasicDetail = (props: Props) => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    return (
        <>
            <main className="flex-1 p-6 space-y-6 h-full overflow-auto ">
                <section>
                    <h2 className="text-lg font-semibold mb-4">Basic details</h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="serviceName">Service name</Label>
                            <Input
                                id="serviceName"
                                placeholder="Add a service name, e.g. Men's Haircut"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                            />
                            <div className="text-right text-sm text-gray-500 mt-1">
                                {serviceName.length}/255
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="serviceType">Service type</Label>
                                <Select>
                                    <SelectTrigger id="serviceType">
                                        <SelectValue placeholder="Select service type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="haircut">Haircut</SelectItem>
                                        <SelectItem value="coloring">Coloring</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-gray-500 mt-1">Used to help clients find your service on Fresha marketplace</p>
                            </div>
                            <div>
                                <Label htmlFor="menuCategory">Menu category</Label>
                                <Select>
                                    <SelectTrigger id="menuCategory">
                                        <SelectValue placeholder="Select menu category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hair">Hair</SelectItem>
                                        <SelectItem value="nails">Nails</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-gray-500 mt-1">The category displayed to you, and to clients online</p>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                placeholder="Add a short description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="text-right text-sm text-gray-500 mt-1">
                                {description.length}/1000
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-4">Pricing and duration</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="duration">Duration</Label>
                            <Select defaultValue="1h">
                                <SelectTrigger id="duration">
                                    <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="30m">30 min</SelectItem>
                                    <SelectItem value="1h">1h</SelectItem>
                                    <SelectItem value="1h30m">1h 30min</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="priceType">Price type</Label>
                            <Select defaultValue="fixed">
                                <SelectTrigger id="priceType">
                                    <SelectValue placeholder="Select price type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fixed">Fixed</SelectItem>
                                    <SelectItem value="variable">Variable</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                    MMK
                                </span>
                                <Input id="price" type="number" placeholder="0.00" className="pl-12" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default BasicDetail