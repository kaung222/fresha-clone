import L, { LatLngExpression } from 'leaflet';
import React, { useState } from 'react'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'

let DefaultIcon = L.icon({
    iconUrl: "/img/mylocation.png",
    iconRetinaUrl: "/img/mylocation.png",
    shadowUrl: "",
    iconSize: [16, 16], // size of the icon
    iconAnchor: [16, 8], // point where the marker is anchored
    popupAnchor: [1, -16], // point where the popup is anchored
    shadowSize: [16, 16] // size of the shadow
})
L.Marker.prototype.options.icon = DefaultIcon


type Props = {
    setPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
    position: LatLngExpression | null;
    shouldFlyToPosition: boolean;
    setShouldFlyToPosition: React.Dispatch<React.SetStateAction<boolean>>

}

const MyLocationMarker = ({ position, setPosition, shouldFlyToPosition, setShouldFlyToPosition }: Props) => {
    const map = useMapEvents({
        // dblclick() {
        //     map.locate();
        //     position && map.flyTo(position, map.getZoom())
        // }
        // ,
        locationfound(e) {
            //@ts-ignore
            setPosition(e.latlng)

            if (shouldFlyToPosition) {
                map.flyTo(e.latlng, map.getZoom());
                setShouldFlyToPosition(false); // Reset flag
            }
        },


    })

    return position === null ? null : (
        <Marker position={position} icon={DefaultIcon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default MyLocationMarker