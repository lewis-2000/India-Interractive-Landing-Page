/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { Map } from 'leaflet'; //Map type from Leaflet

import 'leaflet/dist/leaflet.css';
import Zones from '../info/Zones';
import States from '../info/States';

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

// Zone URLs based on the state's name mapping
const stateUrls: { [key: string]: string } = {
    "Andhra Pradesh": "https://example.com/AndhraPradesh",
    "Arunachal Pradesh": "https://example.com/ArunachalPradesh",
    "Assam": "https://example.com/Assam",
    "Bihar": "https://example.com/Bihar",
    "Chhattisgarh": "https://example.com/Chhattisgarh",
    "Goa": "https://example.com/Goa",
    "Gujarat": "https://example.com/Gujarat",
    "Haryana": "https://example.com/Haryana",
    "Himachal Pradesh": "https://example.com/HimachalPradesh",
    "Jharkhand": "https://example.com/Jharkhand",
    "Jammu and Kashmir": "https://example.com/JammuAndKashmir",
    "Karnataka": "https://example.com/Karnataka",
    "Kerala": "https://example.com/Kerala",
    "Ladakh": "https://example.com/Ladakh",
    "Madhya Pradesh": "https://example.com/MadhyaPradesh",
    "Maharashtra": "https://example.com/Maharashtra",
    "Manipur": "https://example.com/Manipur",
    "Meghalaya": "https://example.com/Meghalaya",
    "Mizoram": "https://example.com/Mizoram",
    "Nagaland": "https://example.com/Nagaland",
    "Odisha": "https://example.com/Odisha",
    "Punjab": "https://example.com/Punjab",
    "Rajasthan": "https://example.com/Rajasthan",
    "Sikkim": "https://example.com/Sikkim",
    "Tamil Nadu": "https://example.com/TamilNadu",
    "Telangana": "https://example.com/Telangana",
    "Tripura": "https://example.com/Tripura",
    "Uttar Pradesh": "https://example.com/UttarPradesh",
    "Uttarakhand": "https://example.com/Uttarakhand",
    "West Bengal": "https://example.com/WestBengal",
};

const RevisedMap: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [hoveredZone, setHoveredZone] = useState<number | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const mapRef = useRef<Map>(null);
    // console.log(mapRef);



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

        const fillColor = stateColors[stateName] || '#FFFFFF';

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
            click: () => {
                setSelectedState(feature.properties.st_nm);
                window.location.href = stateUrls[feature.properties.st_nm];

                // Focus on the clicked state in the map
                if (mapRef.current) {
                    console.log("clicked state");
                    const stateBounds = layer.getBounds();
                    mapRef.current.fitBounds(stateBounds, { padding: [20, 20], maxZoom: 8 });
                }
            },
        });

        // Bind a tooltip to the layer to show the state name on hover
        layer.bindTooltip(feature.properties.st_nm, {
            permanent: false,
            direction: "top",
            opacity: 0.8,
            className: "state-tooltip", // Add this class for custom styling if needed
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
            <States stateColors={stateColors} onStateClick={handleStateClick} hoveredState={hoveredState} />
        </div>
    );
};

export default RevisedMap;
