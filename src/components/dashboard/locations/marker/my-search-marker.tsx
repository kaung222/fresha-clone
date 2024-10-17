import { LatLngExpression } from 'leaflet';
import React, { useState } from 'react'
import { useMap } from 'react-leaflet';

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
type Props = {
    setMarkPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
    markPosition: LatLngExpression | null;
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResultsType[]>>
    searchResults: SearchResultsType[];
}


const MapSearchBox = ({ markPosition, setMarkPosition, searchResults, setSearchResults }: Props) => {
    const map = useMap();

    const searchLocation = async (query: string) => {
        if (query.length > 2) {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await response.json();
            setSearchResults(data);
        }
    };
    const selectLocation = (lat: string, lon: string) => {
        setMarkPosition({ lat: Number(lat), lng: Number(lon) });
        setSearchResults([]); // Clear search results after selecting
    };
    if (markPosition) {
        // Adjust the map zoom and fly to the selected position
        //@ts-ignore
        map.flyTo([markPosition.lat, markPosition.lng], 15); // 15 is the desired zoom level
    }

    return (
        <div className=' z-[1000] absolute top-0 right-0 '>
            <input
                type="text"
                placeholder="Search location"
                onChange={(e) => searchLocation(e.target.value)}
                style={{ padding: '10px', marginBottom: '10px' }}
            />
            <ul>
                {searchResults.map((result) => (
                    <li key={result.place_id} onClick={() => selectLocation(result.lat, result.lon)}>
                        {result.display_name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MapSearchBox