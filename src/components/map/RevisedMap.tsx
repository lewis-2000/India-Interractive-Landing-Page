/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map } from 'leaflet';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setStateHover, setStateClick, setZoneHover } from "../../store/interactionSlice";
import { useRef } from "react";

const RevisedMap = () => {
    const dispatch = useAppDispatch();
    const geoData = useAppSelector((state) => state.geoJson.data); // Fetch GeoJSON from Redux
    const IndianStates = useAppSelector((state) => state.stateSlice); // State color and metadata
    const hoveredState = useAppSelector((state) => state.interaction.stateHover);
    const zoneHover = useAppSelector((state) => state.interaction.zoneHover);
    const mapRef = useRef<Map | null>(null);

    // console.log("Zone Hover : ", zoneHover);


    // Map center coordinates (India)
    const center: [number, number] = [20.5937, 78.9629];

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
            color: "#fff",
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




    // const focusOnState = (layer: any) => {
    //     if (mapRef.current) {
    //         // console.log("Focusing on clicked state", mapRef.current);
    //         const stateBounds = layer.getBounds();
    //         // console.log("State Bounds:", stateBounds);

    //         mapRef.current.fitBounds(stateBounds, { padding: [5, 5], maxZoom: 5 });
    //         // mapRef.current.setView(stateBounds, 5);

    //     } else {
    //         console.log("Map reference is not available");
    //     }
    // };


    const onEachFeature = (feature: any, layer: any) => {

        // const zones = feature.properties.zones;
        // console.log("ZoneLayer : ", feature.properties.zones);

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

                // layer.setStyle({ weight: 5, color: '#000', fillOpacity: 1.0 });
                if (layer._path) layer._path.classList.add('state-hover-3d');
                layer.openTooltip(); // Show the tooltip
                // focusOnState(layer); // Center the map on the clicked state

            },
            mouseout: () => {
                // layer.setStyle({ weight: 1, color: 'white', fillOpacity: 1.0 });
                dispatch(setStateHover(null));
                dispatch(setZoneHover(null));
                if (layer._path) layer._path.classList.remove('state-hover-3d');
                layer.closeTooltip(); // Hide the tooltip
            },
            click: () => {
                dispatch(setStateClick(feature.properties.st_nm));

                const stateData = IndianStates.find(state => state.name === feature.properties.st_nm);
                // console.log("State Data", stateData);
                const stateUrl = stateData?.url;
                window.location.href = `https://example.com/${stateUrl}`;
            },

        });

    };


    // useEffect(() => {
    //     if (hoveredState) {
    //         console.log("UseEffect - Hovere on state: " + hoveredState);
    //     }
    // })

    return (
        <MapContainer
            ref={mapRef}
            center={center}
            zoom={5}
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
            {/* Load GeoJSON with defined styles and event handlers */}
            {geoData && (
                <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
            )}
        </MapContainer>
    );
};

export default RevisedMap;
