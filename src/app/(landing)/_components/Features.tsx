"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  FaWandMagicSparkles,
  FaBolt,
  FaCompass,
  FaCheck,
} from "react-icons/fa6";

const FeatureCard = ({
  icon,
  title,
  lines,
  accentClass,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  accentClass: string;
}) => (
  <div className="h-full p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 ease-in-out hover:-translate-y-1">
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`text-white text-xl rounded-lg p-3 shadow-md ${accentClass}`}
      >
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-white">{title}</h3>
    </div>
    <ul className="text-white/85 space-y-2">
      {lines.map((l, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1 text-emerald-400">
            <FaCheck />
          </span>
          <span className="text-sm md:text-base leading-relaxed">{l}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Features = () => {
  const router = useRouter();
  const quickSearch = (q: string) =>
    router.push(`/places?q=${encodeURIComponent(q)}`);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="w-full md:w-4/5 lg:w-3/4 mx-auto text-center relative">
        <span className="inline-block text-[11px] tracking-wider uppercase text-white/60 mb-2">
          Why TravelAI
        </span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold py-2 text-gradient">
          Built for curious explorers
        </h2>
        <p className="text-white/80 max-w-3xl mx-auto text-sm md:text-base">
          Tell us what you are craving or the vibe you want. We handle the
          rest—finding the best options nearby, in real time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-8">
          <FeatureCard
            icon={<FaWandMagicSparkles />}
            title="Personalized by AI"
            lines={[
              "Understands your tastes & constraints",
              "Learns from what you save",
              "Smart filters: diet, budget, distance",
            ]}
            accentClass="bg-gradient-to-tr from-indigo-500 to-fuchsia-500"
          />
          <FeatureCard
            icon={<FaBolt />}
            title="Live & local"
            lines={[
              "Up-to-date ratings and hours",
              "Trends and events happening now",
              "See what’s busy before you go",
            ]}
            accentClass="bg-gradient-to-tr from-amber-500 to-rose-500"
          />
          <FeatureCard
            icon={<FaCompass />}
            title="Beyond restaurants"
            lines={[
              "Hidden gems and classic attractions",
              "Cafes, theatres, parks, and more",
              "One place to plan your time out",
            ]}
            accentClass="bg-gradient-to-tr from-cyan-400 to-emerald-500"
          />
        </div>

        <div className="mx-auto max-w-2xl mt-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.querySelector(
                'input[name="q"]'
              ) as HTMLInputElement;
              if (input && input.value.trim()) {
                quickSearch(input.value.trim());
              }
            }}
            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-2 py-2 backdrop-blur-sm"
          >
            <input
              name="q"
              type="text"
              placeholder="Try: cozy cafe near me, best tacos under $15"
              className="flex-1 bg-transparent text-sm md:text-base text-white placeholder-white/50 focus:outline-none px-2"
            />
            <button className="px-3.5 py-2 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-white/90">
              Search
            </button>
          </form>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {["coffee shop", "pizza", "vegan restaurant", "museum", "park"].map(
              (c) => (
                <button
                  key={c}
                  onClick={() => quickSearch(c)}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/40"
                >
                  {c}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
