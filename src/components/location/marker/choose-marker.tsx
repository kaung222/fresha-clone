import { LatLngExpression } from 'leaflet';
import React from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet';

type Props = {
    setSelectedPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
    selectedPosition: LatLngExpression | null;

}

const ChosenMarker = ({ setSelectedPosition, selectedPosition }: Props) => {
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

export default ChosenMarker