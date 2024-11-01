import React, { useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { setStateHover } from '../../store/interactionSlice';

const StateList: React.FC = () => {
    const dispatch = useAppDispatch();
    const hoveredState = useAppSelector((state) => state.interaction.stateHover);
    const states = useAppSelector((state) => state.stateSlice);

    // Refs to store each state's list item
    const stateRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

    const handleHover = (stateName: string) => {
        dispatch(setStateHover(stateName));
    };

    // Scroll into view when hoveredState changes
    useEffect(() => {
        if (hoveredState && stateRefs.current[hoveredState]) {
            stateRefs.current[hoveredState]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [hoveredState]);

    return (
        <div className="hidden lg:block fixed top-0 right-0 h-full w-60 bg-gray-900 text-white shadow-lg p-4" style={{ zIndex: 700 }}>
            <div className="sticky top-0 bg-gray-900 z-10">
                <h2 className="text-xl font-semibold mb-4">State List</h2>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
                <ul>
                    {states.map((state) => (
                        <li
                            key={state.name}
                            ref={(el) => (stateRefs.current[state.name] = el)}
                            className={`flex items-center mb-2 pl-2 rounded-md cursor-pointer ${hoveredState === state.name ? 'bg-orange-500 text-black' : 'hover:bg-gray-800'
                                }`}
                            onMouseEnter={() => handleHover(state.name)}
                        >
                            <span
                                className="inline-block w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: state.color }}
                            ></span>
                            {state.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StateList;
