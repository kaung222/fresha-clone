'use client'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'

type Props = {}


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


const GeolocationMap = (props: Props) => {
    function LocationMarker() {
        const [position, setPosition] = useState(null)
        // console.log(position)
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                //@ts-ignore
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    return (
        <>
            <MapContainer
                style={{ width: '100%', height: '100vh' }}
                center={{ lat: 51.505, lng: -0.09 }}
                zoom={13}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>,
        </>
    )
}

export default GeolocationMap