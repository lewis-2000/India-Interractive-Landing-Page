/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import StateInfo from '../States/StateInfo';
// import L from 'leaflet';

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

// Capitals' locations
// const capitals = [
//     { state: "Andhra Pradesh", capital: "Amaravati", coords: [16.5062, 80.6480] },
//     { state: "Arunachal Pradesh", capital: "Itanagar", coords: [27.1000, 93.6167] },
//     { state: "Assam", capital: "Dispur", coords: [26.1445, 91.7898] },
//     { state: "Bihar", capital: "Patna", coords: [25.5941, 85.1376] },
//     { state: "Chhattisgarh", capital: "Raipur", coords: [21.2514, 81.6296] },
//     { state: "Goa", capital: "Panaji", coords: [15.4989, 73.8278] },
//     { state: "Gujarat", capital: "Gandhinagar", coords: [23.2156, 72.6369] },
//     { state: "Haryana", capital: "Chandigarh", coords: [30.7333, 76.7794] },
//     { state: "Himachal Pradesh", capital: "Shimla", coords: [31.1048, 77.1700] },
//     { state: "Jharkhand", capital: "Ranchi", coords: [23.3560, 85.3340] },
//     { state: "Karnataka", capital: "Bengaluru", coords: [12.9716, 77.5946] },
//     { state: "Kerala", capital: "Thiruvananthapuram", coords: [8.5241, 76.9366] },
//     { state: "Madhya Pradesh", capital: "Bhopal", coords: [23.2599, 77.4126] },
//     { state: "Maharashtra", capital: "Mumbai", coords: [19.0760, 72.8777] },
//     { state: "Manipur", capital: "Imphal", coords: [24.8170, 93.9368] },
//     { state: "Meghalaya", capital: "Shillong", coords: [25.5788, 91.8933] },
//     { state: "Mizoram", capital: "Aizawl", coords: [23.1645, 92.9376] },
//     { state: "Nagaland", capital: "Kohima", coords: [25.6728, 94.1000] },
//     { state: "Odisha", capital: "Bhubaneswar", coords: [20.2961, 85.8189] },
//     { state: "Punjab", capital: "Chandigarh", coords: [30.7333, 76.7794] },
//     { state: "Rajasthan", capital: "Jaipur", coords: [26.9124, 75.7873] },
//     { state: "Sikkim", capital: "Gangtok", coords: [27.3389, 88.6065] },
//     { state: "Tamil Nadu", capital: "Chennai", coords: [13.0827, 80.2707] },
//     { state: "Telangana", capital: "Hyderabad", coords: [17.3850, 78.4867] },
//     { state: "Tripura", capital: "Agartala", coords: [23.8290, 91.2868] },
//     { state: "Uttar Pradesh", capital: "Lucknow", coords: [26.8467, 80.9462] },
//     { state: "Uttarakhand", capital: "Dehradun", coords: [30.3165, 78.0322] },
//     { state: "West Bengal", capital: "Kolkata", coords: [22.5726, 88.3639] },
// ];

const RevisedMap: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [hoveredZone, setHoveredZone] = useState<number | null>(null);
    // const [infoVisible, setInfoVisible] = useState<boolean>(true);

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

        if (stateName === hoveredState) {
            return {
                // fillColor: '#FFA500',
                weight: 2,
                opacity: 1,
                color: 'black',
                fillOpacity: 1,
            };
        }

        if (hoveredZone !== null && zone === hoveredZone) {
            return {
                // fillColor: '#FFD700',
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

        // Set the hovered state and zone
        setHoveredState(properties.st_nm);
        setHoveredZone(properties.zones);

        // Apply the "protrusion" effect by increasing the scale and adding a shadow
        layer.setStyle({
            weight: 3, // Increase border weight
            color: '#000000', // Change border color
            fillOpacity: 1.0, // Make the state more solid

        });

        // Add CSS transform effect by manipulating the state layer's element directly
        if (layer._path) {
            layer._path.classList.add('state-hover-3d');
        }
    };

    const onStateMouseOut = (event: any) => {
        const layer = event.target;

        // Reset the hovered state and zone
        setHoveredState(null);
        setHoveredZone(null);

        // Reset the layer's style to its default
        layer.setStyle({
            weight: 1,
            color: 'white',
            fillOpacity: 1.0,
        });

        // Remove the transform effect
        if (layer._path) {
            layer._path.classList.remove('state-hover-3d');


            // layer._path.style.transform = 'none'; // Reset transform
            // layer._path.style.zIndex = ''; // Reset z-index
        }
    };


    // const onCloseInfo = () => {
    //     setInfoVisible(false);
    // };

    const onEachFeature = (feature: any, layer: any) => {
        const stateName = feature.properties.st_nm;

        // Assign hover events to states
        layer.on({
            mouseover: onStateHover,
            mouseout: onStateMouseOut,
            click: () => {
                window.location.href = `https://example.com/${stateName.replace(/\s+/g, '-').toLowerCase()}`; // Redirect to the specific state's page
            },
        });

        // Bind a tooltip with the state name to each state
        layer.bindTooltip(stateName, {
            sticky: true,
            permanent: false,
        });

        //label for the state name
        // const label = L.divIcon({
        //     className: 'state-label',
        //     html: stateName,
        //     iconSize: [50, 20],
        //     iconAnchor: [25, 10],
        // });

        //Label position for each state
        layer.bindTooltip(stateName, { permanent: true, direction: 'center' }).openTooltip();
        layer.setStyle({ fillOpacity: 1.0 });
        layer.on({
            click: () => {
                window.location.href = `https://example.com/${stateName.replace(/\s+/g, '-').toLowerCase()}`; // Redirect to the specific state's page
            }
        });
    };

    return (
        <div className="h-screen w-full z-10 map-container-3d">
            <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full" zoomControl={false} attributionControl={false}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                />
                {data && (
                    <>
                        <GeoJSON
                            data={data}
                            style={getStyle}
                            onEachFeature={onEachFeature}
                        />

                        {/* Add tooltips for capitals */}
                        {/* {capitals.map((capital) => (
                            <Marker key={capital.capital} position={capital.coords} opacity={0}>
                                <Tooltip permanent className='bg-transparent border border-gray-300 p-2 rounded-mdt'>
                                    <strong>{capital.capital}</strong>
                                </Tooltip>
                            </Marker>
                        ))} */}

                    </>
                )}
            </MapContainer>

            {/* Show the state info box */}
            {/* {infoVisible && (
                <StateInfo
                    stateName={hoveredState}
                    info="Additional state information shown here."
                    onClose={onCloseInfo}
                />
            )} */}
        </div>
    );
};

export default RevisedMap;
