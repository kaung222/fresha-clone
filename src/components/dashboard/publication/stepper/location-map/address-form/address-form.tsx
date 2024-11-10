'use client'
import { useGetAddressByGeolocation } from "@/api/openstreetmap/get-address-by-geo"
import CircleLoading from "@/components/layout/circle-loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

type Props = {}

const AddressForm = (props: Props) => {
    const { data, isLoading } = useGetAddressByGeolocation()
    console.log(data)
    return (
        <>
            {isLoading ? (
                <CircleLoading />
            ) : (
                data && (
                    <Card className="max-w-2xl">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                {
                                    Object.entries(data.address).map(([item, value]) => (
                                        <div key={item} className="space-y-1">
                                            <div className="text-sm font-medium">{item}</div>
                                            <div>{value}</div>
                                        </div>
                                    ))
                                }
                                {/* <div className="space-y-1">
                                    <div className="text-sm font-medium">city</div>
                                    <div>{data.address.city}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">city District</div>
                                    <div>{data.address.city_district}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">Country</div>
                                    <div>{data.address.country}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">code</div>
                                    <div>{data.address.country_code}</div>
                                </div> */}

                            </div>
                        </CardContent>
                    </Card>
                )
            )}
        </>
    )
}

export default AddressForm