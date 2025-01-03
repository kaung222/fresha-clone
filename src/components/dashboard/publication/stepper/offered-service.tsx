'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from 'lucide-react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Organization } from '@/types/organization'
import { PublicationTypesUpdate } from '@/api/publication/publication-types'
import { offerServices } from '@/components/auth/register/stepper/offered-service'


type Props = {
    organization: Organization;
}


export default function ServiceSelection({ organization }: Props) {
    const [selectedServices, setSelectedServices] = useState<string[]>(organization.types || []);
    const { mutate, isPending } = PublicationTypesUpdate();
    const { setQuery } = useSetUrlParams();
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