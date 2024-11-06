import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; //react-icons for menu and close icons
import { useAppSelector, useAppDispatch } from '../../store/store';
import { setStateHover } from '../../store/interactionSlice';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    // const state = useAppSelector((state) => state.stateSlice);
    const indianStates = useAppSelector((state) => state.stateSlice);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="absolute w-full md:w-auto flex justify-between items-center p-4 bg-transparent text-gray-100 z-1000" style={{ zIndex: 1000 }}>
            {/* Logo and Text */}
            <div className="flex items-center space-x-3">
                <img src="/India-Interractive-Landing-Page//IndiaFlag.png" alt="Logo" className="h-8" />
                <span className="font-bold text-lg">IndiaTourBook</span>
            </div>

            {/* Menu Button for Mobile */}
            <button
                className="text-2xl md:hidden"
                onClick={toggleMenu}
                aria-label="Open Menu"
            >
                <FiMenu />
            </button>

            {/* Fly-out Menu */}
            <div
                className={`fixed inset-0 bg-gray-950/5 backdrop-blur-md text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                {/* Close Button */}
                <div className="flex justify-between p-4">
                    <h1 className='text-white text-lg'>State List</h1>
                    <button
                        className="text-3xl"
                        onClick={toggleMenu}
                        aria-label="Close Menu"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Menu Items */}
                <ul className="flex flex-col space-y-4 mt-10 text-lg overflow-y-auto h-[80%] px-4">
                    {indianStates.map((state) => (
                        <li key={state.name} onClick={() => {
                            setIsOpen(false);
                            dispatch(setStateHover(state.name));

                        }}>
                            <a href={state.url} target="_blank" rel="noopener noreferrer" onClick={() => { setIsOpen(false) }}>
                                <span
                                    className="inline-block w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: state.color }}
                                ></span>

                                {/* <span style={{ color: state.color }}>{state.name}</span> */}
                                <span style={{ color: "white" }}>{state.name}</span>


                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
