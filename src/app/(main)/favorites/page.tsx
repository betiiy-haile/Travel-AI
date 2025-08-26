// src/app/favorites/page.tsx
"use client";
import React, { useEffect, useState } from "react";

type LatLng = { lat: number; lng: number };

export type Place = {
  id?: string;
  name?: string;
  address?: string;
  location?: LatLng;
  website?: string;
  kinds?: string[];
  features?: string[];
  // add other fields you persist here
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Place[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("favorites");
    setFavorites(raw ? JSON.parse(raw) : []);
  }, []);

  function remove(i: number) {
    const next = [...favorites];
    next.splice(i, 1);
    setFavorites(next);
    localStorage.setItem("favorites", JSON.stringify(next));
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
          Favorites
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Your saved places for quick access.
        </p>
      </div>

      {/* List */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="p-3 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-100">
            Saved places{" "}
            {favorites.length > 0 && (
              <span className="text-slate-500">({favorites.length})</span>
            )}
          </h2>
          {favorites.length > 0 && (
            <button
              className="text-xs px-3 py-1 rounded border border-slate-800 hover:bg-slate-800 text-slate-200"
              onClick={() => {
                setFavorites([]);
                localStorage.setItem("favorites", JSON.stringify([]));
              }}
            >
              Clear all
            </button>
          )}
        </div>
        <div className="p-3 space-y-2">
          {favorites.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-slate-400 text-sm">
              No favorites yet.
            </div>
          ) : (
            favorites.map((f, i) => (
              <div
                key={i}
                className="p-3 rounded border border-slate-800 bg-slate-900/50 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="font-semibold text-slate-100">{f.name}</div>
                  <div className="text-sm text-slate-400">{f.address}</div>
                </div>
                <div className="flex items-center gap-2">
                  {f.location && (
                    <a
                      className="px-3 py-2 rounded text-white text-xs bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.openstreetmap.org/?mlat=${f.location.lat}&mlon=${f.location.lng}#map=18/${f.location.lat}/${f.location.lng}`}
                    >
                      View map
                    </a>
                  )}
                  <button
                    className="px-3 py-2 rounded border border-slate-800 text-xs hover:bg-slate-800 text-slate-200"
                    onClick={() => remove(i)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
