// src/components/SearchBar.tsx
"use client";
import { Place } from "@/app/(main)/favorites/page";
import React, { useState } from "react";

type Props = {
  onResults?: (places: Place[]) => void;
};

export default function SearchBar({ onResults }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("park");
  const [loading, setLoading] = useState(false);

  async function doSearch() {
    setLoading(true);
    try {
      // get geolocation (fallback to manual prompt)
      const pos = await new Promise<GeolocationPosition | null>((resolve) => {
        if (!navigator.geolocation) return resolve(null);
        navigator.geolocation.getCurrentPosition(
          (p) => resolve(p),
          () => resolve(null)
        );
      });
      const lat = pos?.coords.latitude ?? 0;
      const lng = pos?.coords.longitude ?? 0;

      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng, radius: 2000, category, limit: 20 }),
      });
      console.log("result from teh api", res);
      const json = await res.json();
      onResults?.(json.places || []);
    } catch (e) {
      console.error(e);
      onResults?.([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex gap-2 items-center">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-200"
      >
        <option value="park">Park</option>
        <option value="playground">Playground</option>
        <option value="beach">Beach</option>
        <option value="trail">Trail</option>
        <option value="attraction">Attraction</option>
      </select>
      <input
        type="text"
        value={query}
        placeholder="Try: playgrounds near me"
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded bg-slate-800 border border-slate-800 placeholder-slate-500 text-slate-100"
      />
      <button
        onClick={doSearch}
        className="px-4 py-2 rounded text-white shadow-sm bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
