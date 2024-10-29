import { useState, useRef, useEffect } from 'react';
import { HiBars3BottomRight, HiXCircle } from "react-icons/hi2"; // Importing the close icon

interface StatesProps {
    stateColors: { [key: string]: string };
    onStateClick: (state: string) => void;
    hoveredState: string | null;
}

const States = ({ stateColors, onStateClick, hoveredState }: StatesProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const stateListRef = useRef<HTMLUListElement>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false); // Function to close the menu

    useEffect(() => {
        if (hoveredState && stateListRef.current) {
            const hoveredItem = stateListRef.current.querySelector(`li[data-state="${hoveredState}"]`);
            if (hoveredItem) {
                hoveredItem.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hoveredState]);

    return (
        <>
            {/* Toggle Button for Mobile Mode */}
            <button
                className="absolute top-4 right-4 z-50 p-2 text-white bg-gray-700 rounded-full md:hidden hover:bg-gray-800 transition-colors"
                onClick={toggleMenu}
                style={{ zIndex: 1000 }}
                title='toggle State List'
            >
                <HiBars3BottomRight size={20} color='white' />
            </button>

            {/* State List Container */}
            <div
                className={`absolute top-0 right-0 h-auto max-h-screen p-4 w-full md:w-64 bg-gray-700 backdrop-blur-sm bg-opacity-30 overflow-y-auto shadow-lg transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}
                style={{ zIndex: 1000 }}
            >
                {/* Close Button for Mobile Mode */}
                <button
                    className="absolute top-4 right-4 z-50 p-2 text-white bg-gray-700 rounded-full md:hidden hover:bg-gray-800 transition-colors"
                    onClick={closeMenu}
                    style={{ zIndex: 1000 }}
                    title='Close Menu'
                >
                    <HiXCircle size={20} color='white' />
                </button>

                <h2 className="text-lg font-bold mb-4 text-gray-200">List of States</h2>
                <h3 className="text-sm font-normal mb-4 text-gray-200">Click to highlight on Map</h3>
                <ul className="space-y-2" ref={stateListRef}>
                    {Object.keys(stateColors).map((state) => (
                        <li
                            key={state}
                            data-state={state}
                            className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${hoveredState === state ? 'bg-gray-800' : ''}`}
                            onClick={() => {
                                onStateClick(state);
                                setIsMenuOpen(false);
                                console.log("States.tsx - Clicked on state : " + state);
                            }}
                        >
                            <span
                                className="inline-block w-3 h-3 rounded-full"
                                style={{ backgroundColor: stateColors[state] }}
                            />
                            <span className="text-gray-300 font-medium">{state}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default States;
