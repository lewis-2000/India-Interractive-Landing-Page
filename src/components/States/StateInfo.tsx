import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface StateInfoProps {
    stateName?: string;
    onClose: () => void;
}

interface StateData {
    name: string;
    imageUrl?: string;
    description: string;
}

const StateInfo: React.FC<StateInfoProps> = ({ stateName, onClose }) => {
    const [stateInfo, setStateInfo] = useState<StateData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStateData = async () => {
            if (!stateName) return;

            try {
                const summaryResponse = await axios.get(
                    `https://en.wikipedia.org/w/api.php`,
                    {
                        params: {
                            action: 'query',
                            titles: stateName,
                            prop: 'extracts|pageimages',
                            exintro: true,
                            explaintext: true,
                            format: 'json',
                            origin: '*',
                            pithumbsize: 300,
                        },
                    }
                );

                const pageData = summaryResponse.data.query.pages;
                const pageId = Object.keys(pageData)[0];

                if (pageId === '-1') {
                    setError(`No information found for "${stateName}".`);
                    return;
                }

                const imageUrl = pageData[pageId].thumbnail?.source;
                const description = pageData[pageId].extract;

                setStateInfo({
                    name: stateName,
                    imageUrl,
                    description,
                });
            } catch (error) {
                console.error('Error fetching state info:', error);
                setError('Failed to fetch state information. Please try again later.');
            }
        };

        fetchStateData();
    }, [stateName]);

    return (
        <div className="absolute md:top-28 bottom-5 md:left-0 left-1/2 transform md:translate-x-0 -translate-x-1/2 m-0 w-11/12 md:w-96 max-w-lg flex flex-col items-center md:items-start justify-center px-4 py-4 z-50 backdrop-blur-sm bg-gray-700 bg-opacity-30 rounded-lg shadow-lg mt- md:ml-3" style={{ zIndex: 1000 }}>
            {stateInfo ? (
                <>
                    <h2 className="text-white text-2xl font-bold">{stateInfo.name}</h2>
                    {stateInfo.imageUrl && (
                        <img
                            className="mt-2 w-full h-48 object-cover rounded-lg"
                            src={stateInfo.imageUrl}
                            alt={stateInfo.name}
                        />
                    )}
                    <p className="text-white text-lg mt-2">{stateInfo.description.slice(0, 100)}...</p>

                    {/* Link to detailed info page */}
                    <Link
                        to={`/state/${stateInfo.name}`}
                        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
                    >
                        View Details
                    </Link>
                </>
            ) : (
                <h2 className="text-white text-lg font-semibold text-center mt-2 bg-gray-800 bg-opacity-60 p-2 rounded-lg shadow-md">
                    Hover over a state for more information.
                </h2>
            )}
            {error && <p className="text-red-400 mt-2">{error}</p>}
            <button
                className="mt-2 md:hidden px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    );
};

export default StateInfo;
