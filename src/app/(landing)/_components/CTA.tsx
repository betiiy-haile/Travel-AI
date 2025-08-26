"use client";
import React from "react";

const CTA = () => {
  return (
    <section className="py-16 flex items-center justify-center">
      <div className="w-full md:w-4/5 lg:w-3/4 text-center flex flex-col gap-5 px-4 md:px-0">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight text-gradient">
          Ready to explore smarter?
        </h2>

        <p className="w-full md:w-[70%] lg:w-[55%] mx-auto text-sm md:text-lg text-white/90 leading-relaxed">
          Start with a few preferences and let Travel AI do the heavy lifting.
          Your next great outing is a tap away.
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleClick}
            className="bg-white text-slate-900 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base hover:bg-transparent hover:text-white border border-white/30 transition duration-300 ease-in-out"
          >
            Create your plan
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base text-white/90 hover:text-white border border-white/30 hover:border-white/60 transition duration-300 ease-in-out"
          >
            Try a demo chat
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default CTA;
