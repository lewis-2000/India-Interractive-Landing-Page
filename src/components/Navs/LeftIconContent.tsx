import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="absolute top-0 left-1/2 transform -translate-x-1/2 m-0 w-auto flex items-center justify-center md:justify-start px-6 py-1 z-50 bg-opacity-30 rounded-lg shadow-lg mt-3 md:left-0 md:ml-28" >
            <img src="/India-Interractive-Landing-Page/IndiaFlag.png" alt="Logo" className="h-20 w-auto mr-3" />
            <h1 className="text-white text-3xl md:text-2xl font-bold">India</h1>
        </nav>
    );
};

export default Navbar;
