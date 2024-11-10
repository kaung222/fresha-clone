import L, { LatLngExpression } from 'leaflet';
import React from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet';

type Props = {
    setSelectedPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
    selectedPosition: LatLngExpression | null;

}

let DefaultIcon = L.icon({
    iconUrl: "/img/location.png",
    iconRetinaUrl: "/img/location.png",
    shadowUrl: "",
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point where the marker is anchored
    popupAnchor: [1, -34], // point where the popup is anchored
    shadowSize: [41, 41] // size of the shadow
})

const ChosenMarker = ({ setSelectedPosition, selectedPosition }: Props) => {
    useMapEvents({
        click(e) {
            console.log(e)
            // Set the selected position when the user clicks on the map
            setSelectedPosition(e.latlng);
        },
    });

    return selectedPosition ? (
        <Marker position={selectedPosition} icon={DefaultIcon}>
            <Popup>
                Selected Location: <br />
                {/* Lat: {selectedPosition.lat.toFixed(4)}, Lng: {selectedPosition.lng.toFixed(4)} */}
            </Popup>
        </Marker>
    ) : null;
}

export default ChosenMarker