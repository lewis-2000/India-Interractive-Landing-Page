const Zones = ({
    selectedZone,
    onZoneClick,
}: {
    selectedZone: number | null;
    onZoneClick: (zone: number) => void;
}) => {
    const zones = [1, 2, 3, 4, 5, 6];

    // Zone URLs based on the state's name mapping
    const zoneUrls: { [key: number]: string } = {
        1: "https://example.com/zone-1",
        2: "https://example.com/zone-2",
        3: "https://example.com/zone-3",
        4: "https://example.com/zone-4",
        5: "https://example.com/zone-5",
        6: "https://example.com/zone-6",
    };

    return (
        <div
            className="absolute bottom-0 left-0 p-2 w-full md:w-[20%] bg-dark-gray shadow-lg md:h-auto"
            style={{ zIndex: 1000 }}
        >
            <div className="flex md:flex-col flex-row justify-between overflow-auto md:overflow-visible">
                {zones.map((zone) => (
                    <button
                        key={zone}
                        id={`zone-${zone}`}
                        className={`flex-1 mb-0 md:mb-2 mx-1 md:mx-0 px-2 py-1 font-bold text-white rounded transition-colors ${selectedZone === zone
                            ? "bg-orange-500"
                            : "bg-gray-800 hover:bg-gray-700"
                            }`}
                        style={{ flexBasis: "16.5%" }} // Each button takes an equal width
                        onClick={() => {
                            onZoneClick(zone);
                            window.location.href = zoneUrls[zone];
                        }}
                        onMouseOver={() => console.log(`Hovering over Zone ${zone}`)}
                    >
                        ZONE {zone}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Zones;
