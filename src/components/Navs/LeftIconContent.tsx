import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="absolute top-0 left-0 flex items-center justify-start px-6 py-1 z-50 bg-opacity-30 rounded-lg shadow-lg mt-3 w-auto md:ml-28">
            <img
                src="/India-Interractive-Landing-Page/IndiaFlag.png"
                alt="Logo"
                className="h-14 w-auto mr-3 md:h-20 transition-all" // Smaller height for mobile mode
            />
            <h1 className="text-white text-2xl md:text-3xl font-bold">India</h1>
        </nav>
    );
};

export default Navbar;
