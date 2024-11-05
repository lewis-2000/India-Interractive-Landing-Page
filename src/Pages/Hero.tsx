import { useState, useEffect } from 'react';
import RevisedMap from "../components/Map/RevisedMap";
import StateList from "../components/States/StateList";
import Zones from "../components/Zones/Zones";
import InfoBanner from "../components/messages/InfoBanner";

const Hero = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Set initial state based on window width

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="h-full w-full relative">
            {!isMobile && (
                <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4" style={{ zIndex: 450 }}>
                    <InfoBanner />
                </div>
            )}
            <RevisedMap />
            <StateList />
            <Zones />
        </div>
    );
};

export default Hero;
