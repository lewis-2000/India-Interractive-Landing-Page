import { useAppDispatch, useAppSelector } from "../../store/store";
import { setZoneHover } from "../../store/interactionSlice";

const Zones = () => {
    const dispatch = useAppDispatch();
    const hoveredZone = useAppSelector((state) => state.interaction.zoneHover || state.interaction.zoneClick);
    const zones = useAppSelector((state) => state.zonesSlice); // Load zones from Redux state

    const handleZoneHover = (zone: number) => {
        dispatch(setZoneHover(zone));
    };

    const handleZoneClick = (zone: number) => {
        const zoneData = zones.find(z => z.zone === zone);
        if (zoneData) {
            window.location.href = zoneData.url;
        }
    };

    return (
        <div
            className="absolute bottom-0 left-0 p-2 w-full md:w-[20%] md:h-auto md:m-2"
            style={{ zIndex: 700 }}
        >
            <div className="flex md:flex-col flex-row justify-between overflow-auto md:overflow-visible">
                {zones.map((zone) => (
                    <button
                        key={zone.zone}
                        id={`${zone.zone}`}
                        className={`flex-1 mb-0 md:mb-2 mx-1 md:mx-0 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 font-bold rounded-md text-white transition-transform transform ${hoveredZone === zone.zone
                            ? "bg-orange-500"
                            : "bg-transparent border-2 border-gray-700 hover:bg-gray-700"
                            }`}
                        style={{ flexBasis: "16.5%" }} // Removed the highlight color from the buttons
                        onClick={() => handleZoneClick(zone.zone)}
                        onMouseOver={() => handleZoneHover(zone.zone)}
                    >
                        ZONE {zone.zone}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Zones;
