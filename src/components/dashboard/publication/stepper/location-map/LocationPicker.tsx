'use client';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { LocateIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import MapSearchInput from './map-search-input';
import L, { LatLngExpression } from 'leaflet';
import MyLocationMarker from './marker/my-location-marker';
import ChosenMarker from './marker/choose-marker';



// Dynamically import MapContainer and other react-leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
// const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
// const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// import dynamic from 'next/dynamic';
// import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import L, { LatLngExpression } from 'leaflet'
// import MyLocationMarker from './marker/my-location-marker';
// import ChosenMarker from './marker/choose-marker';
// import { Button } from '@/components/ui/button';
// import { LocateIcon } from 'lucide-react';
// import MapSearchInput from './map-search-input';

// let DefaultIcon = L.icon({
//     iconUrl: "/img/location.png",
//     iconRetinaUrl: "/img/location.png",
//     shadowUrl: "",
//     iconSize: [25, 41], // size of the icon
//     iconAnchor: [12, 41], // point where the marker is anchored
//     popupAnchor: [1, -34], // point where the popup is anchored
//     shadowSize: [41, 41] // size of the shadow
// })
// L.Marker.prototype.options.icon = DefaultIcon


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
    center?: L.LatLngExpression;
    markedPosition: LatLngExpression | null;
    setMarkedPosition: React.Dispatch<React.SetStateAction<L.LatLngExpression | null>>;
}

const LocationPicker = ({
    center = [51.505, -0.09],
    markedPosition,
    setMarkedPosition
}: Props) => {
    const [selectedPosition, setSelectedPosition] = useState<LatLngExpression | null>(null);
    // const [searchResults, setSearchResults] = useState<SearchResultsType[]>([]);
    // const mapRef = useRef<L.Map | null>(null);
    const [shouldFlyToPosition, setShouldFlyToPosition] = useState(false);
    const [shouldFlyToSearchedPosition, setShouldFlyToSearchedPosition] = useState(false);
    const [isClient, setIsClient] = useState(false);



    useEffect(() => {
        // Set flag when component is mounted on the client
        setIsClient(true);
    }, []);



    const handleLocateUser = () => {
        // const map = useMap();
        // if (map) {
        //     map.locate();
        // }
        setShouldFlyToPosition(true); // Set flag to trigger flyTo on location found
    };



    return (
        <>

            <div className=' relative w-full h-full'>
                <div className=' absolute top-0 right-0 w-[300px] z-[10] '>
                    <MapSearchInput setShouldFlyToSearchedPosition={setShouldFlyToSearchedPosition} setMarkPosition={setMarkedPosition} />
                </div>
                <Button className=' absolute bottom-10 right-10 z-[10] w-12 h-12 rounded-full p-0 flex justify-center items-center ' type='button' variant={'outline'} onClick={() => handleLocateUser()}>
                    <LocateIcon className=' w-6 h-6 block ' />
                </Button>

                {isClient && (
                    <MapContainer style={{ width: '100%', height: '100%', zIndex: 1 }} center={center} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <MyLocationMarker shouldFlyToPosition={shouldFlyToPosition} setShouldFlyToPosition={setShouldFlyToPosition} setPosition={setSelectedPosition} position={selectedPosition} />
                        <ChosenMarker shouldFlyToSearchedPosition={shouldFlyToSearchedPosition} setShouldFlyToSearchedPosition={setShouldFlyToSearchedPosition} selectedPosition={markedPosition} setSelectedPosition={setMarkedPosition} />

                    </MapContainer>
                )}


            </div>
        </>
    );
};

export default LocationPicker;