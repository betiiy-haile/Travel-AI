import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Importing an icon for better visuals

const FeatureCard = () => {
    return (
        <div className="w-full group flex flex-col gap-6 p-6 rounded-lg bg-[#3C465E] bg-opacity-60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2">

            {/* Icon */}
            <div className="text-white text-4xl bg-indigo-700 rounded-full p-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <FaMapMarkerAlt /> {/* Icon to represent the feature visually */}
            </div>

            {/* Feature Content */}
            <div className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex items-center justify-between text-xl font-semibold text-white group-hover:text-indigo-400 transition duration-300">
                    <span className="cursor-pointer">Personalized Suggestions</span>
                </div>

                {/* Description */}
                <p className="text-[#E4E7EB] lg:text-lg leading-snug group-hover:text-gray-300 transition duration-300">
                    Get recommendations tailored to your tastes and preferences.
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;
