import React, { memo, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './station-map.css';

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom component to handle zooming and centering the map when a station is selected
const MapView = ({ station }) => {
	const map = useMap();

	useEffect(() => {
		if (station) {
			// Zoom to the station's location
			map.setView([station.latitude, station.longitude], 15); // Zoom level 15 for closer view
		}
	}, [station, map]);

	return null;
};

const StationMap = ({
	currLocation,
	stations,
	selectedStation,
	onStationSelect,
}) => {
	const mapRef = useRef(null);
	const markerRefs = useRef({}); // Track marker references

	useEffect(() => {
		if (selectedStation && markerRefs.current[selectedStation.id]) {
			// Open the popup for the selected station
			markerRefs.current[selectedStation.id].openPopup();
		}
	}, [selectedStation]);

	return (
		<MapContainer
			center={[currLocation?.latitude, currLocation?.longitude]}
			zoom={13}
			className='leaflet-container'
			ref={mapRef}
		>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>

			{/* Zoom to the selected station */}
			{selectedStation && <MapView station={selectedStation} />}

			{/* Render markers for all stations */}
			{stations.map((station) => (
				<Marker
					key={station.id}
					position={[station.latitude, station.longitude]}
					ref={(el) => (markerRefs.current[station.id] = el)} // Store marker references
					eventHandlers={{
						click: () => {
							onStationSelect(station); // Select the station on marker click
						},
					}}
				>
					<Popup>
						{station.name} <br /> {station.distance} miles away.
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default memo(StationMap);
