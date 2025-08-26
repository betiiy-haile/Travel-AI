"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };

  return (
    <section className="h-[95vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_20%_20%,#6366f1_0,transparent_35%),radial-gradient(circle_at_80%_0%,#22d3ee_0,transparent_30%),radial-gradient(circle_at_80%_80%,#a855f7_0,transparent_30%)]" />
      <div className="w-full md:w-4/5 lg:w-3/4 text-center flex flex-col gap-6 px-4 md:px-0 relative">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          AI travel concierge • Instant, personal, nearby
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-gradient">
          Discover your next great escape nearby
        </h1>

        <p className="w-full md:w-[75%] lg:w-[65%] mx-auto text-base md:text-xl text-white/90 leading-relaxed">
          Travel AI curates restaurants, attractions, and hidden gems based on
          your tastes, time, and budget. Ask like you text a friend—and go.
        </p>

        <div className="mx-auto w-full md:w-[70%] lg:w-[60%] flex flex-col justify-center sm:flex-row gap-2 mt-2">
          <button
            onClick={handleClick}
            className="bg-white text-slate-900 mx-auto sm:mx-0 px-5 md:px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base hover:bg-transparent hover:text-white border border-white/30 hover:shadow-md transition duration-300 ease-in-out"
          >
            Get started free
          </button>
          <button
            onClick={() => router.push("/places")}
            className="mx-auto sm:mx-0 px-5 md:px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base text-white/90 hover:text-white border border-white/30 hover:border-white/60 transition duration-300 ease-in-out"
          >
            See what’s nearby
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-white/70">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
            No sign-up needed to browse
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
            Real-time places & ratings
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
            Personalized with AI
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
