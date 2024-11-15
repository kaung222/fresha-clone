'use client'
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { useMap, useMapEvents } from 'react-leaflet';

const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });


type Props = {
    setSelectedPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
    selectedPosition: LatLngExpression | null;
    shouldFlyToSearchedPosition: boolean;
    setShouldFlyToSearchedPosition: React.Dispatch<React.SetStateAction<boolean>>;
}

// let DefaultIcon = L.icon({
//     iconUrl: "/img/location.png",
//     iconRetinaUrl: "/img/location.png",
//     shadowUrl: "",
//     iconSize: [25, 41], // size of the icon
//     iconAnchor: [12, 41], // point where the marker is anchored
//     popupAnchor: [1, -34], // point where the popup is anchored
//     shadowSize: [41, 41] // size of the shadow
// })

const ChosenMarker = ({ setSelectedPosition, selectedPosition, shouldFlyToSearchedPosition, setShouldFlyToSearchedPosition }: Props) => {
    const { setQuery } = useSetUrlParams();
    const map = useMap()
    const [icon, setIcon] = useState(null);

    // Set up the Leaflet icon only on the client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const L = require('leaflet');
            const customIcon = L.icon({
                iconUrl: "/img/location.png",
                iconSize: [25, 41], // size of the icon
                iconAnchor: [12, 41], // point where the marker is anchored
                popupAnchor: [1, -34] // point where the popup is anchored
            });
            setIcon(customIcon);
        }
    }, []);

    useMapEvents({
        click(e) {
            // Set the selected position when the user clicks on the map
            setSelectedPosition(e.latlng);
            setQuery({ key: 'lat', value: e.latlng.lat.toString() })
            setQuery({ key: 'lng', value: e.latlng.lng.toString() })
        },
    });

    useEffect(() => {
        if (shouldFlyToSearchedPosition && selectedPosition) {
            map.flyTo(selectedPosition, map.getZoom());
            setShouldFlyToSearchedPosition(false); // Reset the flag after flying
        }
    }, [shouldFlyToSearchedPosition, selectedPosition, map, setSelectedPosition]);



    return selectedPosition && icon ? (
        <Marker position={selectedPosition} icon={icon} >
            <Popup>
                Selected Location: <br />
                {/* Lat: {selectedPosition.lat.toFixed(4)}, Lng: {selectedPosition.lng.toFixed(4)} */}
            </Popup>
        </Marker>
    ) : null;
}

export default ChosenMarker