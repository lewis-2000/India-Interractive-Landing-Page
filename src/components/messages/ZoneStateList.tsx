import React from 'react';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setStateHover } from '../../store/interactionSlice';

const ZoneStateList: React.FC = () => {
    const dispatch = useAppDispatch();
    const hoveredZone = useAppSelector((state) => state.interaction.zoneHover || state.interaction.zoneClick);
    const IndianStates = useAppSelector((state) => state.stateSlice); // State data from Redux

    // Filter states belonging to the hovered zone
    const statesInZone = IndianStates.filter((state) => state.zone === hoveredZone);
    const hasStates = statesInZone.length > 0;

    return (
        <div className="bg-[#fef9c3] p-4 rounded-lg shadow-md md:w-[200px] mx-0">
            <h3 className="text-md font-semibold mb-2 text-gray-800">States in ZONE {hoveredZone}</h3>
            {hasStates ? (
                <ul className="pl-2 mt-2">
                    {statesInZone.map((state) => (
                        <li key={state.name} className="text-gray-700 cursor-pointer hover:text-orange-500 transition-colors duration-200" onClick={() => dispatch(setStateHover(state.name))}>
                            <span
                                className="inline-block w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: state.color }}
                            ></span>
                            {state.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-600 italic text-center mt-2">
                    Hover over a zone to see its states.
                </p>
            )}
        </div>
    );
};

export default ZoneStateList;
