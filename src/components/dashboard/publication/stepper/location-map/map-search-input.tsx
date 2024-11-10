"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Banknote, Building, Clock, Home, Hospital, Landmark, Leaf, MapPin, Plane, Search, Store, Train, X } from "lucide-react"
import { LatLngExpression } from "leaflet"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"


type SearchResultsType = {
    addresstype: string;
    class: string;
    display_name: string;
    lat: string;
    lon: string;
    name: string;
    place_id: number;
    place_rank: number;
    type: string;
}

type Props = {
    mapRef: React.MutableRefObject<L.Map | null>;
    setMarkPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
    markPosition: LatLngExpression | null;
    // setSearchResults: React.Dispatch<React.SetStateAction<SearchResultsType[]>>
    // searchResults: SearchResultsType[];
}

export default function MapSearchInput({ mapRef, markPosition, setMarkPosition }: Props) {
    const [query, setQuery] = useState("");
    const { setQuery: setUrlQuery } = useSetUrlParams()
    const [selectedLocation, setSelectedLocation] = useState<SearchResultsType | null>(null)
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResultsType[]>([]);


    // Function to search for locations using Nominatim API
    const searchLocation = async (query: string) => {
        if (query.length > 2) {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await response.json();
            setSearchResults(data);
        }
    };



    const getIcon = (type: SearchResultsType["type"]) => {
        switch (type) {
            case "history":
                return <Clock className="h-5 w-5 text-gray-400" />;
            case "location":
                return <MapPin className="h-5 w-5 text-gray-400" />;
            case "search":
                return <Search className="h-5 w-5 text-gray-400" />;
            case "building":
                return <Building className="h-5 w-5 text-gray-400" />;
            case "park":
                return <Leaf className="h-5 w-5 text-green-500" />;
            case "station":
                return <Train className="h-5 w-5 text-blue-500" />;
            case "store":
                return <Store className="h-5 w-5 text-orange-500" />;
            case "house":
                return <Home className="h-5 w-5 text-gray-500" />;
            case "monument":
                return <Landmark className="h-5 w-5 text-gray-500" />;
            case "airport":
                return <Plane className="h-5 w-5 text-gray-400" />;
            case "bank":
                return <Banknote className="h-5 w-5 text-gray-400" />;
            case "hospital":
                return <Hospital className="h-5 w-5 text-red-500" />;
            default:
                return <MapPin className="h-5 w-5 text-gray-400" />; // Default to MapPin if no match
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        searchLocation(e.target.value)
        setSelectedLocation(null)
        setIsSearching(true)
    }

    const handleResultClick = (result: SearchResultsType) => {
        const map = mapRef.current;
        setSelectedLocation(result)
        setQuery(result.display_name)
        map?.flyTo([Number(result.lat), Number(result.lon)], map.getZoom());
        setMarkPosition({ lat: Number(result.lat), lng: Number(result.lon) })
        setUrlQuery({ key: 'lat', value: result.lat })
        setUrlQuery({ key: 'lng', value: result.lon })
        setIsSearching(false);
    }

    const handleClearClick = () => {
        setQuery("")
        setSelectedLocation(null)
        setIsSearching(false)
    }

    return (

        <div className="relative">
            <div className="relative">
                <Input
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setIsSearching(true)}
                    className="pl-10 pr-10 h-12 text-lg"
                    placeholder="Search Google Maps"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                {query && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={handleClearClick}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg overflow-hidden z-10">
                    {searchResults.slice(0, 4).map((result) => (
                        <button
                            key={result.lat}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => handleResultClick(result)}
                        >
                            {getIcon(result.type)}
                            <div>
                                <div className="font-medium">{result.display_name}</div>
                                {result.name && (
                                    <div className="text-sm text-gray-500">{result.name}</div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>

    )
}