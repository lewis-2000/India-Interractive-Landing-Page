import { useAppDispatch, useAppSelector } from "../../store/store";
import { setZoneHover } from "../../store/interactionSlice";
import InfoBanner from "../messages/InfoBanner";
import ZoneStateList from "../messages/ZoneStateList";

const Zones = () => {
    const dispatch = useAppDispatch();
    const hoveredZone = useAppSelector((state) => state.interaction.zoneHover || state.interaction.zoneClick);
    const zones = useAppSelector((state) => state.zonesSlice);

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
            className="fixed bottom-0 left-0 p-2 w-full md:w-[35%] max-h-[90vh] md:my-2  flex flex-col-reverse md:flex-row-reverse md:items-end"
            style={{ zIndex: 500, paddingBottom: "env(safe-area-inset-bottom, 1rem)" }}
        >
            {/* ZoneStateList */}
            <div className="order-1 md:order-none mb-4 md:mb-20 md:ml-4" style={{ zIndex: 400 }}>
                <ZoneStateList />
            </div>

            {/* Zone Buttons */}
            <div className="flex-1 md:overflow-y-auto">
                <div className="md:hidden mb-3">
                    <InfoBanner />
                </div>

                <div className="flex md:flex-col flex-row justify-between scroll-smooth overflow-x-auto md:overflow-y-auto">
                    {zones.map((zone) => (
                        <button
                            key={zone.zone}
                            id={`${zone.zone}`}
                            className={`flex-1 mb-1 mx-1 md:mx-0 px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 font-bold md:w-[80%] rounded-md text-white transition-transform transform ${hoveredZone === zone.zone
                                ? "bg-orange-500"
                                : "bg-transparent border-2 border-gray-700 hover:bg-gray-700"
                                }`}
                            style={{ flexBasis: "auto" }}
                            onClick={() => handleZoneClick(zone.zone)}
                            onMouseOver={() => handleZoneHover(zone.zone)}
                            onMouseLeave={() => handleZoneHover(null)}
                        >
                            ZONE {zone.zone}
                        </button>
                    ))}
                </div>

                <div className="scroll-indicator md:hidden mt-2 text-center text-gray-500">
                    <p>&larr; Swipe to see more zones &rarr;</p>
                </div>
            </div>
        </div>
    );
};

export default Zones;
