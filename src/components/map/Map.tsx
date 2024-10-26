/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import StateInfo from '../States/StateInfo';

// Define the capitals' locations
const capitals = [
    { state: "Andhra Pradesh", capital: "Amaravati", coords: [16.5062, 80.6480] },
    { state: "Arunachal Pradesh", capital: "Itanagar", coords: [27.1000, 93.6167] },
    { state: "Assam", capital: "Dispur", coords: [26.1445, 91.7898] },
    { state: "Bihar", capital: "Patna", coords: [25.5941, 85.1376] },
    { state: "Chhattisgarh", capital: "Raipur", coords: [21.2514, 81.6296] },
    { state: "Goa", capital: "Panaji", coords: [15.4989, 73.8278] },
    { state: "Gujarat", capital: "Gandhinagar", coords: [23.2156, 72.6369] },
    { state: "Haryana", capital: "Chandigarh", coords: [30.7333, 76.7794] },
    { state: "Himachal Pradesh", capital: "Shimla", coords: [31.1048, 77.1700] },
    { state: "Jharkhand", capital: "Ranchi", coords: [23.3560, 85.3340] },
    { state: "Karnataka", capital: "Bengaluru", coords: [12.9716, 77.5946] },
    { state: "Kerala", capital: "Thiruvananthapuram", coords: [8.5241, 76.9366] },
    { state: "Madhya Pradesh", capital: "Bhopal", coords: [23.2599, 77.4126] },
    { state: "Maharashtra", capital: "Mumbai", coords: [19.0760, 72.8777] },
    { state: "Manipur", capital: "Imphal", coords: [24.8170, 93.9368] },
    { state: "Meghalaya", capital: "Shillong", coords: [25.5788, 91.8933] },
    { state: "Mizoram", capital: "Aizawl", coords: [23.1645, 92.9376] },
    { state: "Nagaland", capital: "Kohima", coords: [25.6728, 94.1000] },
    { state: "Odisha", capital: "Bhubaneswar", coords: [20.2961, 85.8189] },
    { state: "Punjab", capital: "Chandigarh", coords: [30.7333, 76.7794] },
    { state: "Rajasthan", capital: "Jaipur", coords: [26.9124, 75.7873] },
    { state: "Sikkim", capital: "Gangtok", coords: [27.3389, 88.6065] },
    { state: "Tamil Nadu", capital: "Chennai", coords: [13.0827, 80.2707] },
    { state: "Telangana", capital: "Hyderabad", coords: [17.3850, 78.4867] },
    { state: "Tripura", capital: "Agartala", coords: [23.8290, 91.2868] },
    { state: "Uttar Pradesh", capital: "Lucknow", coords: [26.8467, 80.9462] },
    { state: "Uttarakhand", capital: "Dehradun", coords: [30.3165, 78.0322] },
    { state: "West Bengal", capital: "Kolkata", coords: [22.5726, 88.3639] },
];

const MapComponent: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [hoveredZone, setHoveredZone] = useState<number | null>(null);
    const [infoVisible, setInfoVisible] = useState<boolean>(true);

    useEffect(() => {
        fetch('/india.geojson')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching GeoJSON:', error));
    }, []);

    const defaultStyle = {
        fillColor: '#fff',
        weight: 1,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.7,
    };

    const getStyle = (feature: any) => {
        const stateName = feature.properties.st_nm;
        const zone = feature.properties.zones;

        if (stateName === hoveredState) {
            return {
                fillColor: '#FFA500',
                weight: 2,
                opacity: 1,
                color: 'black',
                fillOpacity: 1,
            };
        }

        if (hoveredZone !== null && zone === hoveredZone) {
            return {
                fillColor: '#FFD700',
                weight: 1,
                opacity: 1,
                color: 'black',
                fillOpacity: 0.7,
            };
        }

        return defaultStyle;
    };

    const onStateHover = (event: any) => {
        const { properties } = event.target.feature;
        setHoveredState(properties.st_nm);
        setHoveredZone(properties.zones);
        setInfoVisible(true);
    };

    const onStateMouseOut = () => {
        setHoveredState(null);
        setHoveredZone(null);
    };

    const onCloseInfo = () => {
        setInfoVisible(false);
    };

    const onEachFeature = (feature: any, layer: any) => {
        const stateName = feature.properties.st_nm;

        // Assign hover events to states
        layer.on({
            mouseover: onStateHover,
            mouseout: onStateMouseOut,
        });

        // Bind a tooltip with the state name to each state
        layer.bindTooltip(stateName, {
            sticky: true,
            permanent: false,
        });
    };

    return (
        <div className="h-screen w-full z-10">
            <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full" zoomControl={false} attributionControl={false} >
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
                {/* Add markers for capitals */}
                {capitals.map((capital, index) => (
                    <Marker key={index} position={capital.coords}>
                        <Popup>
                            <strong>{capital.capital}</strong><br />
                            {capital.state}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Show the state info box */}
            {infoVisible && (
                <StateInfo
                    stateName={hoveredState}
                    info="Additional state information shown here."
                    onClose={onCloseInfo}
                />
            )}
        </div>
    );
};

export default MapComponent;
