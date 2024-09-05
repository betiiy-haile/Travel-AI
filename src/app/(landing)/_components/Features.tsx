import React from 'react';

const Features = () => (
    <section className="py-16 bg-gradient-to-b px-4">
        <div className="w-full md:w-4/5 lg:w-3/4 mx-auto text-center">
            {/* Section Title */}
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold py-8 text-gradient">
                Why Choose Us?
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">

                {/* Feature Card 1 */}
                <div className="p-10 py-16 rounded-lg backdrop-blur-lg bg-white bg-opacity-10 border border-transparent hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                        Personalized Suggestions
                    </h3>
                    <p className="text-gray-200 mb-4">
                        Our AI-driven system learns from your preferences, ensuring that every recommendation is tailored just for you. Whether you{"'"}re into fine dining, local street food, or cozy cafes, we{"'"}ve got you covered.
                    </p>
                    <p className="text-gray-200">
                        Save your favorite spots and preferences, and receive suggestions that get better with every interaction.
                    </p>
                </div>

                {/* Feature Card 2 */}
                <div className="p-10 py-16 rounded-lg backdrop-blur-lg bg-white bg-opacity-10 border border-transparent hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                        Real-Time Updates
                    </h3>
                    <p className="text-gray-200 mb-4">
                        Stay informed with real-time updates on restaurant availability, ratings, and popular trends. We fetch the latest information so you never miss out on the best spots near you.
                    </p>
                    <p className="text-gray-200">
                        Our live updates also let you know about events, special offers, and dining experiences happening around you right now.
                    </p>
                </div>

                {/* Feature Card 3 */}
                <div className="p-10 py-16 rounded-lg backdrop-blur-lg bg-white bg-opacity-10 border border-transparent hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                        Diverse Categories
                    </h3>
                    <p className="text-gray-200 mb-4">
                        Whether you{"'"}re looking for a quick snack, a fancy dinner, or weekend entertainment, our platform covers it all. Explore everything from local attractions to international cuisine and entertainment hotspots.
                    </p>
                    <p className="text-gray-200">
                        Easily filter through categories like restaurants, cafes, theatres, and more, all within your chosen location.
                    </p>
                </div>

            </div>
        </div>
    </section>
);

export default Features;
