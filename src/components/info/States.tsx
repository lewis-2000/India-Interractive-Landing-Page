import { useState } from 'react';

const States = ({ stateColors, onStateClick }: { stateColors: { [key: string]: string }; onStateClick: (state: string) => void }) => {
    const [hoveredState, setHoveredState] = useState<string | null>(null);

    return (
        <div className="absolute top-0 right-0 h-auto max-h-64 md:max-h-screen p-4 w-full md:w-64 bg-white overflow-y-auto shadow-lg" style={{ zIndex: 1000 }}>
            <h2 className="text-lg font-bold mb-4 text-gray-800">List of States</h2>
            <h3 className="text-sm font-normal mb-4 text-gray-800">Click to highlight on Map</h3>
            <ul className="space-y-2">
                {Object.keys(stateColors).map((state) => (
                    <li
                        key={state}
                        className={`flex items-center space-x-2 cursor-pointer transition-colors ${hoveredState === state ? 'bg-gray-200' : ''
                            }`}
                        onClick={() => onStateClick(state)}
                        onMouseOver={() => setHoveredState(state)}
                        onMouseOut={() => setHoveredState(null)}
                    >
                        <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: stateColors[state] }}
                        ></span>
                        <span className="text-gray-700 font-medium">{state}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default States;
