'use client';

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet'


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


const GeolocationSelector = () => {
    const [selectedPosition, setSelectedPosition] = useState<LatLngExpression | null>(null);
    console.log(selectedPosition)
    // Component to handle map events, such as clicking to get the location
    function LocationSelector() {
        useMapEvents({
            click(e) {
                // Set the selected position when the user clicks on the map
                setSelectedPosition(e.latlng);
            },
        });

        return selectedPosition ? (
            <Marker position={selectedPosition}>
                <Popup>
                    Selected Location: <br />
                    {/* Lat: {selectedPosition.lat.toFixed(4)}, Lng: {selectedPosition.lng.toFixed(4)} */}
                </Popup>
            </Marker>
        ) : null;
    }

    return (
        <MapContainer
            style={{ width: '100%', height: '100vh' }}
            center={{ lat: 51.505, lng: -0.09 }}
            zoom={13}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector />
        </MapContainer>
    );
};

export default GeolocationSelector;
