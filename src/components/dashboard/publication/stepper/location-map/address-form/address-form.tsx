'use client'

import { Card, CardContent } from "@/components/ui/card"


type ResponseType = {
    address: {
        amenity?: string;
        city: string;
        city_district?: string;
        country: string;
        country_code: string;
        postcode?: string;
        road?: string;
        state: string;
        suburb?: string;
        town?: string;
        township?: string;
    }
}

type Props = {
    addressData: ResponseType
}

const AddressForm = ({ addressData }: Props) => {
    return (
        <>
            {
                addressData && (
                    <Card className="max-w-2xl">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                {
                                    Object.entries(addressData.address).map(([item, value]) => (
                                        <div key={item} className="space-y-1">
                                            <div className="text-sm font-medium">{item}</div>
                                            <div>{value}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </CardContent>
                    </Card>
                )
            }
        </>
    )
}

export default AddressForm