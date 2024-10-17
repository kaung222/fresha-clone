import L, { LatLngExpression } from 'leaflet';
import React, { useState } from 'react'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'

let DefaultIcon = L.icon({
    iconUrl: "/img/circle-location.png",
    iconRetinaUrl: "/img/circle-location.png",
    shadowUrl: "",
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point where the marker is anchored
    popupAnchor: [1, -34], // point where the popup is anchored
    shadowSize: [41, 41] // size of the shadow
})
L.Marker.prototype.options.icon = DefaultIcon


type Props = {
    setPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
    position: LatLngExpression | null;

}

const MyLocationMarker = ({ position, setPosition }: Props) => {
    const map = useMapEvents({
        dblclick() {
            map.locate();
            position && map.flyTo(position, map.getZoom())
        }
        ,
        locationfound(e) {
            //@ts-ignore
            setPosition(e.latlng)
        },

    })

    return position === null ? null : (
        <Marker position={position} icon={DefaultIcon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default MyLocationMarker