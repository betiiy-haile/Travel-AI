'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const CTA = () => {

    const router = useRouter()
    const handleClick = () => {
        router.push("/login")
    }

    return (
        <section className="h-[50vh] flex items-center justify-center ">
            <div className="w-full md:w-4/5 lg:w-3/4 text-center flex flex-col gap-6 px-4 md:px-0">
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight text-gradient">
                    Ready to Explore?
                </h2>

                <p className="w-full md:w-[75%] lg:w-[65%] mx-auto text-lg md:text-2xl text-white leading-relaxed">
                    Join us today and start discovering new places with personalized recommendations!
                </p>

                <button onClick={handleClick} className="bg-white mx-auto px-12 py-4 w-56 rounded-full button-gradient font-semibold text-lg hover:bg-transparent hover:text-white hover:shadow-md transition duration-300 ease-in-out">
                    Sign Up Now
                </button>
            </div>
        </section>
    );
};

export default CTA;
