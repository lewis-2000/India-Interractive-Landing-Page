import { FaCircleInfo } from "react-icons/fa6";

const InfoBanner = () => (
    <div className="info-banner flex-1 mb-1 mx-1 md:mx-0 px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 font-bold rounded-md bg-yellow-100 z-50">
        <p className="flex items-center gap-3">
            <FaCircleInfo className="inline-flex text-base" />
            Click on a state or zone to check tours and itineraries
        </p>
    </div>
);

export default InfoBanner;
