/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map } from 'leaflet'; //Map type from Leaflet
import L from 'leaflet';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setStateHover, setZoneHover, setStateClick, setZoneClick } from "../../store/interactionSlice";
import { useEffect, useRef } from "react";




const MapComponent = () => {
    const dispatch = useAppDispatch();

    const geoData = useAppSelector((state) => state.geoJson.data); // Fetching GeoJSON data from Redux
    const IndianStates = useAppSelector((state) => state.stateSlice); // State color and other metadata
    const isMobile = useAppSelector((state) => state.viewport); //Viewport Size

    const stateHover = useAppSelector((state) => state.interaction.stateHover);
    const zoneHover = useAppSelector((state) => state.interaction.zoneHover);
    const stateClick = useAppSelector((state) => state.interaction.stateClick);
    const zoneClick = useAppSelector((state) => state.interaction.zoneClick);

    // Inside your component
    const mapRef = useRef<Map | null>(null);








    // India Coordinates
    const center: [number, number] = [20.5937, 78.9629];

    // Optionally create a custom layer with higher tile cache size and prerender options
    const tileLayerOptions = {
        maxZoom: 18,
        minZoom: 3,
        updateWhenZooming: false, // Prevents unnecessary tile updates while zooming
        updateWhenIdle: true, // Only update when the map stops moving
        keepBuffer: 3, // Pre-fetch tiles within three zoom levels beyond the view
    };

    // Define the bounds to include India and its nearby regions
    const bounds = L.latLngBounds(
        L.latLng(-40, 40), // Southwest corner limit (arbitrary for context)
        L.latLng(70, 150)  // Northeast corner limit (arbitrary for context)
    );

    // Style function for GeoJSON
    const style = (feature: any) => {
        // Get the state name from feature properties
        const stateName = feature.properties.st_nm.trim();

        // Find the corresponding color in the IndianStates

        const stateData = IndianStates.find(state => state.name === stateName);

        const fillColor = stateData ? stateData.color : "#ccc"; // Default color if not found

        return {
            fillColor,
            weight: 2,
            opacity: 1,
            color: "white",
            fillOpacity: 1.0,
        };
    };

    const onStateHover = (event: any) => {
        const layer = event.target; // Access the layer from the event
        const { properties } = layer.feature; // Get the properties from the feature

        // console.log(`Hovered State: ${properties.st_nm}`);
        // console.log("Layer object:", layer); // Log the layer object

        // Dispatch actions or set hovered states
        dispatch(setStateHover(properties.st_nm)); // Assuming you're using Redux
        dispatch(setZoneHover(properties.zones)); // Assuming you're using Redux

        // Update the layer style
        layer.setStyle({
            weight: 3,
            color: '#000000', // Change to a visible color
            fillOpacity: 1.0, // Full opacity
        });

        // Access the underlying SVG path element
        if (layer._path) {
            layer._path.classList.add('state-hover-3d'); // Apply the 3D effect
            // console.log("Layer Path Element:", layer._path); // Log the SVG path element
        } else {
            // console.warn('No SVG path element found for the layer');
        }
    };

    const onStateMouseLeave = (event: any) => {
        const layer = event.target; // Access the layer from the event

        // Reset the layer style
        layer.setStyle({
            weight: 1,
            color: 'white', // Default color
            fillOpacity: 0.5, // Default opacity
        });

        // Remove the 3D effect class
        if (layer._path) {
            layer._path.classList.remove('state-hover-3d'); // Remove the class
        }
    };





    const onZoneHover = (event: any) => {
        const layer = event.target; // Access the layer from the event
        const { properties } = layer.feature; // Get the properties from the feature

        // Log the zone name for debugging
        // console.log(`Hovered Zone: ${properties.zones}`); // Change to the correct property name

        // Dispatch actions or set hovered zone in Redux
        dispatch(setZoneHover(properties.zones)); // Set the hovered zone

        // Update the layer style to highlight the zone
        layer.setStyle({ weight: 3, color: '#FF5733', fillOpacity: 1.0 }); // Choose a unique color for zones

        // Add a CSS class for additional visual styling if using classes
        if (layer._path) layer._path.classList.add('zone-hover-3d');
    };

    const onZoneMouseLeave = (event: any) => {
        const layer = event.target; // Access the layer from the event

        // Log leaving the zone for debugging
        // console.log(`Mouse left Zone: ${layer.feature.properties.zones}`);

        // Dispatch actions or reset hovered zone in Redux
        dispatch(setZoneHover(null)); // Reset the hovered zone

        // Reset the layer style to its default state
        layer.setStyle({ weight: 1, color: '#FF5733', fillOpacity: 0.5 }); // Choose default color for zones

        // Remove the CSS class for additional visual styling if using classes
        if (layer._path) layer._path.classList.remove('zone-hover-3d');
    };



    const onStateClick = (event: any) => {
        const layer = event.target; // Access the layer from the event
        const { properties } = layer.feature; // Get the properties from the feature


        dispatch(setStateClick(properties.st_nm)); // Set the clicked state

        // Update the layer style if you want to persist the click state visually
        layer.setStyle({ weight: 5, color: '#333', fillOpacity: 1.0 }); // Choose a distinct color for clicked states
    };

    const onZoneClick = (event: any) => {
        const layer = event.target; // Access the layer from the event
        const { properties } = layer.feature; // Get the properties from the feature

        // Log the clicked zone for debugging
        // console.log(`Clicked Zone: ${properties.zones}`);

        // Dispatch actions or set clicked zone in Redux
        dispatch(setZoneClick(properties.zones)); // Set the clicked zone

        // Update the layer style if you want to persist the click state visually
        layer.setStyle({ weight: 5, color: '#00FF00', fillOpacity: 1.0 }); // Choose a distinct color for clicked zones
    };





    const onEachFeature = (feature: any, layer: any) => {
        layer.on({
            mouseover: (event: any) => {
                // Call the hover function with the event and dispatch hover state
                onStateHover(event);
                onZoneHover(event);
            },
            mouseout: (event: any) => {
                // Call a function to handle mouse leave and dispatch hover reset
                onStateMouseLeave(event);
                onZoneMouseLeave(event);  // Call the click function with the event
                dispatch(setStateHover(null)); // Reset the hovered state in Redux
            },
            click: (event: any) => {
                // Handle the state click event
                onStateClick(event); // Call the click function with the event
                onZoneClick(event); // Call the click function with the event

                // Dispatch the clicked state or zone to Redux
                dispatch(setStateClick(feature.properties.st_nm));
                dispatch(setZoneClick(feature.properties.st_nm));
            }
        });
    };


    // Helper function to find a layer by state name
    const getLayerByStateName = (stateName: string): L.Layer | undefined => {
        if (!mapRef.current) return undefined;

        let targetLayer: L.Layer | undefined;
        mapRef.current.eachLayer((layer) => {
            if (layer.feature && layer.feature.properties.st_nm === stateName) {
                targetLayer = layer;
            }
        });
        return targetLayer;
    };

    // Helper function to find all layers by zone name
    const getLayersByZoneName = (zoneName: string): L.Layer[] => {
        if (!mapRef.current) return [];

        const layers: L.Layer[] = [];
        mapRef.current.eachLayer((layer) => {
            if (layer.feature && layer.feature.properties.zones === zoneName) {
                layers.push(layer);
            }
        });
        return layers;
    };




    useEffect(() => {
        if (stateHover) {
            const layer = getLayerByStateName(stateHover);
            console.log("Hovered State: " + stateHover);
            if (layer) {
                layer.setStyle({
                    weight: 3,
                    color: '#000000',
                    fillOpacity: 1.0
                });

            }
        }

        if (zoneHover) {
            const zoneLayers = getLayersByZoneName(zoneHover); // Get all layers for the zone
            // console.log("Zone: " + zoneHover + " Color: #00FF00");
            dispatch(setStateHover(zoneHover));
            zoneLayers.forEach((layer) => {
                layer.setStyle({
                    weight: 4,
                    color: 'red',
                    fillOpacity: 1.0,
                });
            });
        }

        if (stateClick) {
            const clickedStateLayer = getLayerByStateName(stateClick);
            // console.log("State: " + stateClick);
            if (clickedStateLayer) {
                clickedStateLayer.setStyle({
                    weight: 5,
                    color: '#333',
                    fillOpacity: 1.0,
                });
            }
        }

        if (zoneClick) {
            const clickedZoneLayers = getLayersByZoneName(zoneClick); // Get all layers for the clicked zone
            // console.log("Zone clicked: " + zoneClick);
            clickedZoneLayers.forEach((layer) => {
                layer.setStyle({
                    weight: 3,          // Adjust weight for clicked state
                    color: '#FF00FF',   // Color for clicked zone
                    fillOpacity: 1.0,   // Full opacity
                });
            });
        }


        return () => {
            if (stateHover) {
                const prevStateLayer = getLayerByStateName(stateHover);
                if (prevStateLayer) {
                    prevStateLayer.setStyle({
                        weight: 1,
                        color: 'white',
                        fillOpacity: 1.0,
                    });
                }
            }

            // Reset styles for any state or zone not hovered (optional)
            return () => {
                if (zoneHover) {
                    const zoneLayers = getLayersByZoneName(zoneHover);
                    zoneLayers.forEach((layer) => {
                        layer.setStyle({
                            weight: 1,
                            color: 'white', // or your default color
                            fillOpacity: 0.5, // or your default opacity
                        });
                    });

                    console.log("Zone Hovered", zoneHover);
                }

                if (zoneClick) {
                    const clickedZoneLayers = getLayersByZoneName(zoneClick);
                    clickedZoneLayers.forEach((layer) => {
                        layer.setStyle({
                            weight: 1, // Resetting weight on unclick
                            color: 'white', // or your default color
                            fillOpacity: 0.5, // or your default opacity
                        });
                    });
                }

            };
        };
    }, [stateHover, zoneHover, stateClick, zoneClick, dispatch]);





    return (
        <MapContainer
            ref={mapRef}
            // whenReady={(mapInstance: any) => mapRef.current = mapInstance}

            center={center}
            zoom={isMobile ? 5 : 4}
            scrollWheelZoom={false}
            style={{ height: "100vh", width: "100%", backgroundColor: "#333" }}
            zoomControl={false}
            preferCanvas={true} // Prefer Canvas rendering for better performance
            bounds={bounds} // Set bounds here directly
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                {...tileLayerOptions} // Apply tile layer options for optimization
            />

            {/* Add Custom layered colours */}
            {geoData && (
                <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
            )}
        </MapContainer>
    );
};

export default MapComponent;
