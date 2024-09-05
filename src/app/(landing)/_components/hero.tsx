import React from 'react';

const Hero = () => {
    return (
        <section className="h-[70vh] flex items-center justify-center relative">
            <div className="w-full md:w-4/5 lg:w-3/4 text-center flex flex-col gap-6 px-4 md:px-0">
       
                
       
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight text-gradient">
                    Discover Your Next Adventure
                </h1>

                <p className="w-full md:w-[75%] lg:w-[65%] mx-auto text-lg md:text-2xl text-white leading-relaxed">
                    AI-powered travel and entertainment recommendations that match your style and preferences.
                </p>

                <p className="w-full md:w-[60%] mx-auto text-md md:text-lg text-white opacity-80 leading-relaxed">
                    From top restaurants to hidden gems, let us guide you to the best experiences around.
                </p>

                <button className="bg-white mx-auto px-12 py-4 w-56 rounded-full button-gradient  font-semibold text-lg hover:bg-transparent hover:text-white hover:shadow-md transition duration-300 ease-in-out">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Hero;
