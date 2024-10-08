'use client';

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import L, { LatLngExpression } from 'leaflet'
import { Button } from '../ui/button';
import ChosenMarker from './marker/choose-marker';
import MapSearchBox from './marker/map_search_box';
import MyLocationMarker from './marker/my_location_marker';




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

    console.log(selectedPosition, markedPosition)

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



    return (
        <div className=' relative'>

            <MapContainer style={{ width: '100%', height: '80vh' }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MyLocationMarker setPosition={setSelectedPosition} position={selectedPosition} />
                <ChosenMarker selectedPosition={markedPosition} setSelectedPosition={setMarkedPosition} />

            </MapContainer>


        </div>
    );
};

export default LocationPage;
