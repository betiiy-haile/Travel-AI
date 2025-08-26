"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import PlaceCard from "@/components/PlaceCard";
import dynamic from "next/dynamic";
import { Place } from "../favorites/page";
const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false,
});

export default function SearchPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);
  const [userCenter, setUserCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (p) => setUserCenter({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setUserCenter(null)
    );
  }, []);
  const center = places[0]?.location ?? userCenter ?? { lat: 0, lng: 0 };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Page header */}
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
          Explore places
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Search nearby parks, trails, beaches, and attractions.
        </p>
      </div>

      {/* Search input */}
      <div className="mt-6">
        <SearchBar onResults={(ps) => setPlaces(ps)} />
      </div>

      {/* Content grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {/* Left: map + results */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">Map view</h2>
            </div>
            <div className="p-3">
              <div className="rounded-lg overflow-hidden">
                <MapClient places={places} center={center} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                Results{" "}
                {places.length > 0 && (
                  <span className="text-slate-500">({places.length})</span>
                )}
              </h2>
            </div>
            <div className="p-3">
              {places.length === 0 ? (
                <div className="h-32 flex items-center justify-center text-slate-400 text-sm">
                  No results yet — try a search.
                </div>
              ) : (
                <div className="space-y-2">
                  {places.map((p) => (
                    <PlaceCard key={p.id} place={p} onOpen={setSelected} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: filters */}
        <aside className="md:col-span-1">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 sticky top-24">
            <div className="p-4 border-b border-slate-800">
              <h4 className="font-semibold text-slate-100">Filters</h4>
              <p className="text-sm text-slate-400 mt-1">Refine your results</p>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-slate-400 mb-2">Type</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-200">
                    Parks
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-200">
                    Beaches
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-200">
                    Trails
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2">More filters</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 rounded border border-slate-800 text-sm hover:bg-slate-800 text-slate-200">
                    Open now
                  </button>
                  <button className="px-3 py-2 rounded border border-slate-800 text-sm hover:bg-slate-800 text-slate-200">
                    Rated 4+{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Details modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-slate-900 w-full max-w-2xl mx-auto rounded-xl border border-slate-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selected.name}</h3>
              <button
                className="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-slate-800"
                aria-label="Close"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <p className="text-slate-300">{selected.address}</p>
              <div className="mt-4">
                <a
                  className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 text-sm"
                  href={`https://www.openstreetmap.org/?mlat=${selected.location?.lat}&mlon=${selected.location?.lng}#map=18/${selected.location?.lat}/${selected.location?.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in OSM
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
