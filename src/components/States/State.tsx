import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface StateDetails {
    name: string;
    imageUrls?: string;
    description: string;
}

const StateDetail: React.FC = () => {
    const { stateName } = useParams<{ stateName: string }>();
    const [stateDetails, setStateDetails] = useState<StateDetails | null>(null);

    useEffect(() => {
        const fetchStateDetails = async () => {
            try {
                const detailResponse = await axios.get(
                    `https://en.wikipedia.org/w/api.php`,
                    {
                        params: {
                            action: "query",
                            titles: stateName,
                            prop: "extracts|pageimages",
                            format: "json",
                            explaintext: true,
                            piprop: "original",
                            origin: "*",
                        },
                    }
                );

                const pageData =
                    detailResponse.data.query.pages[Object.keys(detailResponse.data.query.pages)[0]];
                const imageUrls = pageData.original?.source;
                const description = pageData.extract;

                setStateDetails({
                    name: stateName,
                    imageUrls,
                    description,
                });
            } catch (error) {
                console.error("Error fetching state details:", error);
            }
        };

        fetchStateDetails();
    }, [stateName]);

    const renderDescription = (description: string) => {
        // Split description into lines
        const lines = description.split('\n');
        return (
            <div className="mt-2">
                {lines.map((line, index) => {
                    // Check for headings and apply proper HTML tags
                    if (line.startsWith("====") && line.endsWith("====")) {
                        const headingText = line.replace(/====/g, "").trim();
                        return (
                            <h2 key={index} className="text-xl font-bold mt-4">
                                {headingText}
                            </h2>
                        );
                    } else if (line.trim() === "") {
                        return <br key={index} />; // Add a line break for empty lines
                    } else {
                        return (
                            <p key={index} className="mt-2">
                                {line}
                            </p>
                        );
                    }
                })}
            </div>
        );
    };

    if (!stateDetails) return null;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-900 bg-opacity-80 rounded-lg shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-4">{stateDetails.name}</h1>
            {stateDetails.imageUrls && (
                <img
                    className="w-full h-64 object-cover rounded-lg"
                    src={stateDetails.imageUrls}
                    alt={stateDetails.name}
                />
            )}
            <div className="mt-6 text-gray-200">
                <h2 className="text-2xl font-semibold">Details</h2>
                {renderDescription(stateDetails.description)}
            </div>
        </div>
    );
};

export default StateDetail;
