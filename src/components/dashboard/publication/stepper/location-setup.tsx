'use client'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { ArrowLeft, Loader2, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LocationPicker from "./location-map/LocationPicker"
import { LatLngExpression } from "leaflet"
import { useSearchLocation } from "@/api/openstreetmap/map-search"
import { useGetAddressByGeolocation } from "@/api/openstreetmap/get-address-by-geo"
import { Card } from "@/components/ui/card"
import { Organization } from "@/types/organization"
import { toast } from "@/components/ui/use-toast"
import { PublicationLocationUpdate } from "@/api/publication/publication-location"

// type SearchResultsType = {
//     addresstype: string;
//     class: string;
//     display_name: string;
//     lat: string;
//     lon: string;
//     name: string;
//     place_id: number;
//     place_rank: number;
// }

type Props = {
    organization: Organization;
}

export default function LocationSetUp({ organization }: Props) {
    const router = useRouter();
    const { setQuery, getQuery } = useSetUrlParams()
    // const [isLoading, setIsLoading] = useState(false);
    const [markedPosition, setMarkedPosition] = useState<LatLngExpression | null>(null);
    // const [searchResults, setSearchResults] = useState<SearchResultsType[]>([]);
    const [address, setAddress] = useState(organization.address);
    // const { data } = useSearchLocation();
    const { data: addressData } = useGetAddressByGeolocation();
    const { mutate, isPending } = PublicationLocationUpdate()
    const lat = getQuery('lat');
    const lng = getQuery('lng');

    useEffect(() => {
        if (organization) {
            //@ts-ignore
            setMarkedPosition({ lat: organization.latitude || '0', lng: organization.longitude || '0' });
            setQuery({ key: 'lat', value: organization.latitude || '0' })
            setQuery({ key: 'lng', value: organization.longitude || '0' })
        }
    }, [organization]);

    useEffect(() => {
        if (addressData?.address) {
            const { city, state, town, township, village, road, suburb } = addressData.address
            setAddress(`${state ? `${state},` : ''} ${city ? `${city},` : ""} ${township || town || suburb || ''}, ${village || road || ''}`)
        }
    }, [addressData])

    const getLatLng = (position: LatLngExpression | null) => {
        if (!position) return null;

        if (Array.isArray(position)) {
            const [lat, lng] = position;
            return { lat, lng };
        } else if (typeof position === 'object' && 'lat' in position && 'lng' in position) {
            return { lat: position.lat, lng: position.lng };
        }
        return null;
    };

    const handleContinue = () => {
        //@ts-ignore
        if (addressData?.error) {
            return toast({ title: "For Business ,Please mark valid location on map!", variant: 'destructive' })
        }
        if (markedPosition) {
            const payload = {
                country: addressData?.address?.country || '',
                city: addressData?.address?.city || addressData?.address?.state || addressData?.address?.town || '',
                address: address,
                latitude: lat,
                longitude: lng
            }
            mutate(payload, {
                onSuccess() {
                    setQuery({ key: 'step', value: 'timetable' })
                }
            })
        } else {
            toast({ title: 'Select a location on map' });
        }
    }

    return (
        <>
            <div className="flex justify-between items-center mb-8 sticky z-50 py-1 bg-white top-[79px] w-full ">
                <Button type="button" onClick={() => router.back()} variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6 text-brandColor " />
                </Button>
                <Button disabled={isPending} variant="brandDefault" onClick={() => handleContinue()}>
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

            <div className="max-w-2xl mx-auto ">
                <div className="text-center mb-8">
                    <p className="text-sm text-gray-500 mb-2">Add business location</p>
                    <h1 className="text-3xl font-bold">Add your location</h1>
                    <p className="text-gray-500 mt-1">
                        Set location of your business for easily searchable by client.
                    </p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="business-location">Business location</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Card className=" w-full px-4 py-2 h-10 flex ">
                                <div className=" w-8 "></div>
                                <div>{`${getLatLng(markedPosition)?.lat || '--'} lat/ ${getLatLng(markedPosition)?.lng || '--'} lng`}</div>
                            </Card>
                        </div>
                        <div className=" p-3 w-full max-w-[590px] h-[500px] ">
                            <LocationPicker center={[Number(organization.latitude || '0'), Number(organization.longitude || '0')]} markedPosition={markedPosition} setMarkedPosition={setMarkedPosition} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="mobile-service" />
                            <label
                                htmlFor="mobile-service"
                                className="text-sm leading-none"
                            >
                                I don&apos;t have a business address (mobile and online service only)
                            </label>
                        </div>
                    </div>
                    {/* {addressLoading ? (
                        <PageLoading />
                    ) : addressData && (
                        <AddressForm addressData={addressData} />
                    )} */}

                    <div className="space-y-4">

                        {/* {searchResults.map((result, index) => (

                            <div key={index} onClick={() => setSearchQuery(result.display_name)} className="px-4 py-2 bg-gray-50 rounded-md">
                                {result.name}
                            </div>
                        ))} */}
                    </div>

                    <div className="space-y-4">
                        <Label>Country</Label>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </form>
            </div>
        </>
    )
}