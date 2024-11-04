/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map } from 'leaflet';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setStateHover, setStateClick, setZoneHover } from "../../store/interactionSlice";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const RevisedMap = () => {
    const dispatch = useAppDispatch();
    const [geoData, setGeoData] = useState(null);
    const IndianStates = useAppSelector((state) => state.stateSlice); // State color and metadata
    const hoveredState = useAppSelector((state) => state.interaction.stateHover);
    const zoneHover = useAppSelector((state) => state.interaction.zoneHover);
    const isMobile = useAppSelector((state) => state.viewport.isMobile);
    const mapRef = useRef<Map | null>(null);


    console.log("Is mobile", isMobile);



    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipText, setTooltipText] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState<[number, number] | null>(null);

    const [zoomLevel, setZoomLevel] = useState(isMobile ? 4 : 5);


    const handleTooltipOnHover = (state: any) => {
        setTooltipText(state.name);
        setTooltipPosition([state.capital.coordinates[0], state.capital.coordinates[1]]);
        setTooltipVisible(true);
        console.log("Tooltip Positions", tooltipPosition);
        console.log("State Hovered Tooltip", state.name);
    };



    // Map center coordinates (India)
    const center: [number, number] = isMobile
        ? [20.5937, 82.5]  // Shift longitude slightly left for mobile
        : [20.5937, 78.9629]; // Default center for desktop


    // Tile layer options for optimization
    const tileLayerOptions = {
        maxZoom: 5,
        minZoom: 3,
        updateWhenZooming: false, // Prevents unnecessary tile updates while zooming
        updateWhenIdle: true, // Only update when the map stops moving
        keepBuffer: 3, // Pre-fetch tiles within three zoom levels beyond the view
    };

    // Style for GeoJSON states
    const style = (feature: any) => {
        const stateName = feature.properties.st_nm.trim();
        const stateData = IndianStates.find((state) => state.name === stateName);
        const baseStyle = {
            fillColor: stateData ? stateData.color : "#ccc",
            weight: 1,
            color: "#FCFCFC",
            fillOpacity: 1.0,
        };

        if (hoveredState === stateName) {
            return {
                ...baseStyle,
                weight: 3,
                color: '#000',
                fillOpacity: 1.0,
            };
        }

        if (zoneHover !== null && feature.properties.zones === zoneHover) {
            return {
                ...baseStyle,
                weight: 3,
                color: '#333',
                fillOpacity: 1.0,
            };
        }

        return baseStyle;
    };

    const onEachFeature = (feature: any, layer: any) => {
        layer.bindTooltip(feature.properties.st_nm, {
            permanent: false, // Tooltip appears only on hover
            direction: 'top', // Position the tooltip above the state
            className: 'state-tooltip', // Optional custom class for styling
            opacity: 0.9, // Adjust tooltip opacity
        });

        layer.on({
            mouseover: () => {
                dispatch(setStateHover(feature.properties.st_nm));
                dispatch(setZoneHover(feature.properties.zones));

                if (layer._path) layer._path.classList.add('state-hover-3d');
                layer.openTooltip(); // Show the tooltip
            },
            mouseout: () => {
                dispatch(setStateHover(null));
                dispatch(setZoneHover(null));
                if (layer._path) layer._path.classList.remove('state-hover-3d');
                layer.closeTooltip(); // Hide the tooltip
            },
            click: () => {
                dispatch(setStateClick(feature.properties.st_nm));
                const stateData = IndianStates.find(state => state.name === feature.properties.st_nm);
                const stateUrl = stateData?.url;
                window.location.href = `https://example.com/${stateUrl}`;
            },
        });
    };

    useEffect(() => {
        const state = IndianStates.find((s) => s.name === hoveredState);
        if (state) {
            handleTooltipOnHover(state);
            // console.log("Hovered state Positions: ", state.capital.coordinates[0]);
        } else {
            setTooltipVisible(false);
        }
    }, [hoveredState, IndianStates]);

    useEffect(() => {
        const loadGeoJSON = async () => {
            try {
                const response = await fetch('/India-Interractive-Landing-Page/india.geojson');
                const data = await response.json();
                setGeoData(data);
            } catch (error) {
                console.error('Error loading GeoJSON data:', error);
            }
        };

        loadGeoJSON();
    }, []);

    useEffect(() => {
        // Adjust zoom level when `isMobile` changes
        setZoomLevel(isMobile ? 4 : 5);

        // Update the map zoom if mapRef is available
        if (mapRef.current) {
            mapRef.current.setZoom(zoomLevel);
        }
    }, [isMobile, zoomLevel]);

    if (!geoData) {
        return (
            <div className="flex justify-center items-center h-screen w-full" style={{ zIndex: 700 }}>
                <ThreeDots   // Type of spinner
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    return (
        <MapContainer
            ref={mapRef}
            center={center}
            zoom={zoomLevel}
            scrollWheelZoom={false}
            style={{ height: "100vh", width: "100%", backgroundColor: "#333" }}
            zoomControl={false}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap & CARTO'
                {...tileLayerOptions}
            />
            {geoData && (
                <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
            )}

            {tooltipVisible && tooltipPosition && (
                <Tooltip position={tooltipPosition} className="state-tooltip z-50" permanent={false} direction="top">
                    <span>{tooltipText}</span>
                </Tooltip>
            )}
        </MapContainer>
    );
};

export default RevisedMap;
