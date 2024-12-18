'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Droplet, Eye, Syringe, Brush, UserPlus, Zap, Anchor, Dumbbell, MoreHorizontal, Space, Braces, Hand, ArrowLeft, Loader2 } from 'lucide-react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useRouter } from 'next/navigation'
import { useLocalstorage } from '@/lib/helpers'
import { toast } from '@/components/ui/use-toast'
import { Organization } from '@/types/organization'
import { PublicationTypesUpdate } from '@/api/publication/publication-types'
import { offerServices } from '@/components/auth/register/stepper/offered-service'

const services = [
    { id: 'haircuts', name: 'Haircuts & styling', icon: <Scissors className='h-8 w-8 mb-2' /> },
    { id: 'nails', name: 'Nail Services', icon: <Droplet className='h-8 w-8 mb-2' /> },
    { id: 'eyebrows', name: 'Eye brow & lashes', icon: <Eye className='h-8 w-8 mb-2' /> },
    { id: 'facials', name: 'Facials & Skincare', icon: <Space className='h-8 w-8 mb-2' /> },
    { id: 'injectables', name: 'Injectables & fillers', icon: <Syringe className='h-8 w-8 mb-2' /> },
    { id: 'makeup', name: 'Make up', icon: <Brush className='h-8 w-8 mb-2' /> },
    { id: 'barbering', name: 'Barbering', icon: <Braces className='h-8 w-8 mb-2' /> },
    { id: 'massage', name: 'Massage', icon: <Hand className='h-8 w-8 mb-2' /> },
    { id: 'hairextension', name: 'Hair extension', icon: <UserPlus className='h-8 w-8 mb-2' /> },
    { id: 'hairremoval', name: 'Hair Removal', icon: <Zap className='h-8 w-8 mb-2' /> },
    { id: 'tattoo', name: 'Tatoo & piercing', icon: <Anchor className='h-8 w-8 mb-2' /> },
    { id: 'fitness', name: 'Fitness', icon: <Dumbbell className='h-8 w-8 mb-2' /> },
    { id: 'others', name: 'Others', icon: <MoreHorizontal className='h-8 w-8 mb-2' /> },
]

type Props = {
    organization: Organization;
}


export default function ServiceSelection({ organization }: Props) {
    const [selectedServices, setSelectedServices] = useState<string[]>(organization.types || []);
    const { mutate, isPending } = PublicationTypesUpdate();
    const { getQuery, setQuery } = useSetUrlParams();
    const router = useRouter();

    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : prev.length < 3 ? [...prev, id] : prev
        )
    }

    const handleContinue = () => {
        // Handle form submission logic here
        if (selectedServices.length > 0) {
            mutate({ types: selectedServices }, {
                onSuccess() {
                    setQuery({ key: 'step', value: 'location-setup' });
                }
            })
        } else {
            toast({ title: "Select types at least one" })
        }
    }


    return (
        <>
            <div className="flex justify-between items-center mb-8 sticky z-50 py-1 bg-white top-[79px] w-full ">
                <Button onClick={() => router.back()} variant="brandGhost" size="icon">
                    <ArrowLeft className="h-6 w-6 text-brandColor " />
                </Button>
                <Button disabled={isPending} type="button" variant={"brandDefault"} onClick={() => handleContinue()} >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Continue'
                    )}
                </Button>
            </div>
            <div className=" max-w-2xl mx-auto space-y-6 ">
                <div className=' text-center px-5 flex flex-col items-center '>
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
                            className={`cursor-pointer transition-colors ${selectedServices.includes(service.id) ? 'bg-gray-300' : 'hover:bg-gray-100'
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