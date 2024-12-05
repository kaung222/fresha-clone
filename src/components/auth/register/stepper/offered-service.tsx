'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Droplet, Eye, Syringe, Brush, UserPlus, Zap, Anchor, Dumbbell, MoreHorizontal, Space, Braces, Hand, ArrowLeft, Loader2 } from 'lucide-react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useRouter } from 'next/navigation'
import { useLocalstorage } from '@/lib/helpers'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'

export const offerServices = [
    { id: 'haircuts', name: 'Haircuts & styling', icon: <Image src={'/img/hairstyling.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'nails', name: 'Nail Services', icon: <Image src={'/img/nail.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'eyebrows', name: 'Eye brow & lashes', icon: <Image src={'/img/eye.png'} alt='eye' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'facials', name: 'Facials & Skincare', icon: <Image src={'/img/skincare.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'injectables', name: 'Injectables & fillers', icon: <Image src={'/img/lip.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'makeup', name: 'Make up', icon: <Image src={'/img/makeup.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'barbering', name: 'Barbering', icon: <Image src={'/img/barber.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'massage', name: 'Massage', icon: <Image src={'/img/massage.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'hairextension', name: 'Hair extension', icon: <Image src={'/img/wavy.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'hairremoval', name: 'Hair Removal', icon: <Image src={'/img/removal.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'tattoo', name: 'Tatoo & piercing', icon: <Image src={'/img/tattoo.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'fitness', name: 'Fitness', icon: <Image src={'/img/fitness.png'} alt='nail' width={320} height={320} className=' w-8 h-8 mb-2 ' /> },
    { id: 'others', name: 'Others', icon: <MoreHorizontal className='h-8 w-8 mb-2' /> },
]

export default function ServiceSelection() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const { getQuery, setQuery } = useSetUrlParams();
    const router = useRouter();
    const { setData, getData } = useLocalstorage();

    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : prev.length < 3 ? [...prev, id] : prev
        )
    }

    const handleContinue = async () => {
        // Handle form submission logic here
        setIsLoading(true)
        if (selectedServices.length > 0) {
            setData('services', JSON.stringify(selectedServices))
            setQuery({ key: 'step', value: 'admin-user' });
        } else {
            toast({ title: 'Select a service at least!' })
        }
        setIsLoading(false)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <Button onClick={() => router.back()} variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button disabled={isLoading} type="button" onClick={() => handleContinue()} >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Continue'
                    )}
                </Button>
            </div>
            <div className=" max-w-2xl mx-auto ">
                <div>
                    <h2 className="text-sm font-medium text-gray-500">Account setup</h2>
                    <h1 className="text-3xl font-bold mt-2">What services do you offer?</h1>
                    <p className="text-gray-500 mt-1">
                        Choose your primary and up to 3 related service types
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {offerServices.map((service) => (
                        <Card
                            key={service.id}
                            className={`cursor-pointer transition-colors ${selectedServices.includes(service.id) ? 'bg-gray-300 ' : 'hover:bg-gray-100'
                                }`}
                            onClick={() => toggleService(service.id)}
                        >
                            <CardContent className="flex flex-col items-center justify-center p-4">
                                {service.icon}
                                <span className="text-sm text-center">{service.name}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}