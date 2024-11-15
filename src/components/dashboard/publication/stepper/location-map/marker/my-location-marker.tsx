import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'

const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

let DefaultIcon: L.Icon;

type Props = {
    setPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
    position: LatLngExpression | null;
    shouldFlyToPosition: boolean;
    setShouldFlyToPosition: React.Dispatch<React.SetStateAction<boolean>>

}

const MyLocationMarker = ({ position, setPosition, shouldFlyToPosition, setShouldFlyToPosition }: Props) => {
    const [icon, setIcon] = useState(null);

    // Set up the Leaflet icon only on the client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const L = require('leaflet');
            const customIcon = L.icon({
                iconUrl: "/img/mylocation.png",
                iconSize: [16, 16], // size of the icon
                iconAnchor: [16, 8], // point where the marker is anchored
                popupAnchor: [1, -16] // point where the popup is anchored
            });
            setIcon(customIcon);
        }
    }, []);

    const map = useMapEvents({
        locationfound(e) {
            //@ts-ignore
            setPosition(e.latlng)

            if (shouldFlyToPosition) {
                map.flyTo(e.latlng, map.getZoom());
                setShouldFlyToPosition(false); // Reset flag
            }
        },
    })
    // Locate user on first render
    useEffect(() => {
        map.locate();
    }, [map]);

    useEffect(() => {
        if (shouldFlyToPosition && position) {
            map.flyTo(position, map.getZoom());
            setShouldFlyToPosition(false); // Reset the flag after flying
        }
    }, [shouldFlyToPosition, position, map, setShouldFlyToPosition]);

    if (!icon) return null;

    return position === null ? null : (
        <Marker position={position} icon={icon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default MyLocationMarker