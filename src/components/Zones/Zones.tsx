import { useAppDispatch, useAppSelector } from "../../store/store";
import { setZoneHover } from "../../store/interactionSlice";

const Zones = () => {
    const dispatch = useAppDispatch();
    const hoveredZone = useAppSelector((state) => state.interaction.zoneHover || state.interaction.zoneClick);
    // console.log("Zones.tsx - Hovered hoveredZone: ", hoveredZone);
    const zones = [1, 2, 3, 4, 5, 6];
    const zoneUrls = {
        1: "https://example.com/zone-1",
        2: "https://example.com/zone-2",
        3: "https://example.com/zone-3",
        4: "https://example.com/zone-4",
        5: "https://example.com/zone-5",
        6: "https://example.com/zone-6",
    };

    const handleZoneHover = (zone: number) => {
        dispatch(setZoneHover(zone));
        // console.log(`Zone ${zone}`);
    };

    const handleZoneClick = (zone: number) => {
        window.location.href = zoneUrls[zone];
    };

    return (
        <div
            className="absolute bottom-0 left-0 p-2 w-full md:w-[20%] bg-gray-900 shadow-lg md:h-auto md:m-2"
            style={{ zIndex: 700 }}
        >
            <div className="flex md:flex-col flex-row justify-between overflow-auto md:overflow-visible">
                {zones.map((zone) => (
                    <button
                        key={zone}
                        id={`${zone}`}
                        className={`flex-1 mb-0 md:mb-2 mx-1 md:mx-0 px-2 py-1 font-bold text-white rounded transition-colors ${hoveredZone === zone
                            ? "bg-orange-500"
                            : "bg-gray-800 hover:bg-gray-700"
                            }`}
                        style={{ flexBasis: "16.5%" }}
                        onClick={() => handleZoneClick(zone)}
                        onMouseOver={() => handleZoneHover(zone)}
                    >
                        ZONE {zone}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Zones;
