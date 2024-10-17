'use client'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const Map = () => {
    const [route, setRoute] = useState([]);

    useEffect(() => {
        // Fetch directions from OpenRouteService
        fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62489a7aa8504a794bfcb4c5432a104c1ab5&start=8.681495,49.41461&end=8.287872,49.620318`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const coordinates = data.features[0].geometry.coordinates.map((coord: any) => [coord[1], coord[0]]); // Convert coordinates for Leaflet
                console.log(coordinates);
                setRoute(coordinates);
            });
    }, []);
    return (
        <MapContainer center={[49.41461, 8.681495]} zoom={13} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                // url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_MAPTILER_API_KEY"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {route.length > 0 && <Polyline positions={route} color="blue" />}
            <Marker position={[49.41461, 8.681495]}>
                <Popup>
                    A sample marker.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
