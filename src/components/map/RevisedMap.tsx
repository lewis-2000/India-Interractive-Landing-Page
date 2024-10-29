/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Zones from '../info/Zones';
import States from '../info/States';

// Define a color mapping for the states
const stateColors: { [key: string]: string } = {
    "Andhra Pradesh": "#FF5733",
    "Arunachal Pradesh": "#e7f900",
    "Assam": "#fe9e0c",
    "Bihar": "#db3a31",
    "Chhattisgarh": "#ef5a56",
    "Goa": "#1ABC9C",
    "Gujarat": "#bd3030",
    "Haryana": "#85cb8e",
    "Himachal Pradesh": "#8E44AD",
    "Jharkhand": "#f9ff3f",
    "Jammu and Kashmir": "#feb918",
    "Karnataka": "#bb5701",
    "Kerala": "#2ECC71",
    "Ladakh": "#85cb8e",
    "Madhya Pradesh": "#8b4fc1",
    "Maharashtra": "#cac452",
    "Manipur": "#e7f900",
    "Meghalaya": "#8E44AD",
    "Mizoram": "#9B59B6",
    "Nagaland": "#F1C40F",
    "Odisha": "#6fd85b",
    "Punjab": "#a361e0",
    "Rajasthan": "#e2ee21",
    "Sikkim": "#e7f900",
    "Tamil Nadu": "#58d067",
    "Telangana": "#9355d0",
    "Tripura": "#3357FF",
    "Uttar Pradesh": "#fea300",
    "Uttarakhand": "#bd3030",
    "West Bengal": "#965ac6",
};

const RevisedMap: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [hoveredZone, setHoveredZone] = useState<number | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);

    useEffect(() => {
        fetch('/India-Interractive-Landing-Page/india.geojson')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching GeoJSON:', error));
    }, []);

    const defaultStyle = {
        weight: 1,
        opacity: 1,
        color: 'gray',
        fillOpacity: 1.0,
    };

    const getStyle = (feature: any) => {
        const stateName = feature.properties.st_nm;
        const zone = feature.properties.zones;

        const fillColor = stateColors[stateName] || '#FFFFFF'; // Default to white if state is not in the map

        if (stateName === hoveredState || stateName === selectedState) {
            return {
                weight: 3,
                color: '#000000',
                fillOpacity: 1,
            };
        }

        if (hoveredZone !== null && zone === hoveredZone) {
            return {
                weight: 1,
                opacity: 1,
                color: '#FFF',
                fillOpacity: 1.0,
            };
        }

        return {
            fillColor: fillColor,
            ...defaultStyle,
        };
    };

    const onStateHover = (event: any) => {
        const layer = event.target;
        const { properties } = layer.feature;
        setHoveredState(properties.st_nm);
        setHoveredZone(properties.zones);
        layer.setStyle({ weight: 3, color: '#000000', fillOpacity: 1.0 });
        if (layer._path) layer._path.classList.add('state-hover-3d');
    };

    const onStateMouseOut = (event: any) => {
        const layer = event.target;
        setHoveredState(null);
        setHoveredZone(null);
        layer.setStyle({ weight: 1, color: 'white', fillOpacity: 1.0 });
        if (layer._path) layer._path.classList.remove('state-hover-3d');
    };

    const onEachFeature = (feature: any, layer: any) => {
        layer.on({
            mouseover: onStateHover,
            mouseout: onStateMouseOut,
            click: () => setSelectedState(feature.properties.st_nm),
        });
    };

    const handleZoneClick = (zone: number) => setHoveredZone(zone);

    const handleStateClick = (state: string) => {
        setSelectedState(state);
    };

    return (
        <div className="h-screen w-full z-10 relative">
            <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full" zoomControl={false} attributionControl={false}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                />
                {data && (
                    <GeoJSON
                        data={data}
                        style={getStyle}
                        onEachFeature={onEachFeature}
                    />
                )}
            </MapContainer>
            <Zones selectedZone={hoveredZone} onZoneClick={handleZoneClick} />
            <States stateColors={stateColors} onStateClick={handleStateClick} />
        </div>
    );
};

export default RevisedMap;
