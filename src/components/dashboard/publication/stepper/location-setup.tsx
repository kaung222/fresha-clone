'use client'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { ArrowLeft, Loader2, MapPin, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import LocationPicker from "./location-map/LocationPicker"
import { LatLngExpression } from "leaflet"
import { useSearchLocation } from "@/api/openstreetmap/map-search"
import { useGetAddressByGeolocation } from "@/api/openstreetmap/get-address-by-geo"
import AddressForm from "./location-map/address-form/address-form"

type SearchResultsType = {
    addresstype: string;
    class: string;
    display_name: string;
    lat: string;
    lon: string;
    name: string;
    place_id: number;
    place_rank: number;
}


export default function LocationSetUp() {
    const router = useRouter();
    const { setQuery, getQuery } = useSetUrlParams()
    const [isLoading, setIsLoading] = useState(false);
    const [markedPosition, setMarkedPosition] = useState<LatLngExpression | null>(null);
    const [searchResults, setSearchResults] = useState<SearchResultsType[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { data } = useSearchLocation();
    const lat = getQuery('lat')
    const lng = getQuery('lng')


    const searchLocation = async (query: string) => {
        if (query.length > 2) {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await response.json();
            setSearchResults(data);
        }
    };

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

    async function getAddress(lat: number, lng: number) {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        console.log(data)
        return data.address; // Contains details like city, state, country, etc.
    }

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <Button onClick={() => router.back()} variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button disabled={isLoading} onClick={() => setQuery({ key: 'step', value: 'timetable' })} >
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

            <div className="max-w-2xl mx-auto p-6">
                <div className="text-center mb-8">
                    <p className="text-sm text-gray-500 mb-2">Add a new location</p>
                    <h1 className="text-2xl font-bold">Add your location</h1>
                </div>

                <form className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="business-location">Business location</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                id="business-location"
                                className="pl-10"
                                placeholder="Mark your business location on map in order to client find you easily"
                                value={`${getLatLng(markedPosition)?.lat} lat/ ${getLatLng(markedPosition)?.lng} lng`}
                                onFocus={() => getAddress(getLatLng(markedPosition)?.lat || 0, getLatLng(markedPosition)?.lng || 0)}

                            />
                        </div>
                        <div className=" p-3 w-full max-w-[590px] h-[500px] ">
                            <LocationPicker markedPosition={markedPosition} setMarkedPosition={setMarkedPosition} />
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
                    {(lat && lng) && (
                        <AddressForm />
                    )}

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Company name</Label>
                            <Button variant="link" className="text-blue-600 h-auto p-0">
                                Edit
                            </Button>
                        </div>
                        {searchResults.map((result, index) => (

                            <div key={index} onClick={() => setSearchQuery(result.display_name)} className="px-4 py-2 bg-gray-50 rounded-md">
                                {result.name}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <Label>Address</Label>
                        <Button variant="link" className="text-blue-600 h-auto p-0 flex items-center gap-1">
                            <Plus className="h-4 w-4" />
                            Add
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <Label>Note</Label>
                        <Button variant="link" className="text-blue-600 h-auto p-0 flex items-center gap-1">
                            <Plus className="h-4 w-4" />
                            Add
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}