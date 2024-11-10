'use client';

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import L, { LatLngExpression } from 'leaflet'
import MyLocationMarker from './marker/my-location-marker';
import ChosenMarker from './marker/choose-marker';
import { Button } from '@/components/ui/button';
import { LocateIcon } from 'lucide-react';
import MapSearchInput from './map-search-input';





let DefaultIcon = L.icon({
    iconUrl: "/img/location.png",
    iconRetinaUrl: "/img/location.png",
    shadowUrl: "",
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point where the marker is anchored
    popupAnchor: [1, -34], // point where the popup is anchored
    shadowSize: [41, 41] // size of the shadow
})
L.Marker.prototype.options.icon = DefaultIcon

type SelectedPositionType = {
    lat: string;
    lon: string
}

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



const LocationPage = () => {
    const [selectedPosition, setSelectedPosition] = useState<LatLngExpression | null>(null);
    const [searchResults, setSearchResults] = useState<SearchResultsType[]>([]);
    const [markedPosition, setMarkedPosition] = useState<LatLngExpression | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const [shouldFlyToPosition, setShouldFlyToPosition] = useState(false);
    console.log(selectedPosition, markedPosition);

    // Function to search for locations using Nominatim API
    // const searchLocation = async (query: string) => {
    //     if (query.length > 2) {
    //         const response = await fetch(
    //             `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    //         );
    //         const data = await response.json();
    //         setSearchResults(data);
    //     }
    // };

    // Handling when a location is selected from search results
    // const selectLocation = (lat: string, lon: string) => {
    //     setSelectedPosition({ lat: Number(lat), lng: Number(lon) });
    //     setSearchResults([]); // Clear search results after selecting
    // };
    // Custom hook to adjust the map view and zoom

    const handleLocateUser = () => {
        const map = mapRef.current;
        console.log(map)
        if (map) {
            setShouldFlyToPosition(true); // Set flag to trigger flyTo on location found
            map.locate();
        }
    };


    return (
        <div className=' relative h-full w-full '>
            <Button className=' absolute bottom-10 right-10 z-[10] w-12 h-12 rounded-full p-0 flex justify-center items-center ' variant={'outline'} onClick={() => handleLocateUser()}>
                <LocateIcon className=' w-6 h-6 block ' />
            </Button>

            <div className=' absolute top-0 right-0 w-[300px] z-[10] '>
                <MapSearchInput markPosition={markedPosition} setMarkPosition={setMarkedPosition} mapRef={mapRef} />
            </div>

            <MapContainer ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1 }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyLocationMarker shouldFlyToPosition={shouldFlyToPosition} setShouldFlyToPosition={setShouldFlyToPosition} setPosition={setSelectedPosition} position={selectedPosition} />
                <ChosenMarker selectedPosition={markedPosition} setSelectedPosition={setMarkedPosition} />

            </MapContainer>


        </div>
    );
};

export default LocationPage;