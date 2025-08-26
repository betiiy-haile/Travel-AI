"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { OverpassElement } from "@/utils/types";

type OsmPlace = {
  id: string;
  name?: string;
  address?: string;
  location?: { lat: number; lng: number };
  kinds?: string[];
  website?: string;
};

function normalizeOverpassElement(el: OverpassElement): OsmPlace {
  const id = `${el.type}/${el.id}`;
  const tags = el.tags || {};
  const location =
    el.type === "node"
      ? { lat: el.lat, lng: el.lon }
      : el.center
      ? { lat: el.center.lat, lng: el.center.lon }
      : undefined;
  const kinds: string[] = [];
  if (tags.leisure) kinds.push(tags.leisure);
  if (tags.tourism) kinds.push(tags.tourism);
  if (tags.natural) kinds.push(tags.natural);
  return {
    id,
    name: tags.name || tags["official_name"],
    address: tags["addr:full"] || tags["addr:street"],
    location,
    kinds,
    website: tags.website || tags.url,
  };
}

export default function OsmPlacePage() {
  const { osmId } = useParams();
  const [place, setPlace] = useState<OsmPlace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const parsed = useMemo(() => {
    if (!osmId || typeof osmId !== "string") return null;
    const [type, idStr] = decodeURIComponent(osmId).split("/");
    const id = Number(idStr);
    if (!type || Number.isNaN(id)) return null;
    return { type, id } as { type: "node" | "way" | "relation"; id: number };
  }, [osmId]);

  useEffect(() => {
    async function run() {
      if (!parsed) return;
      setLoading(true);
      setError(null);
      try {
        const q = `\n[out:json][timeout:25];\n${parsed.type}(${parsed.id});\nout tags center;`;
        const res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: q,
        });
        if (!res.ok) throw new Error("Overpass error");
        const data = await res.json();
        const el = (data.elements && data.elements[0]) || null;
        if (!el) throw new Error("Place not found");
        setPlace(normalizeOverpassElement(el));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [parsed]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => console.warn("Failed to get user location")
      );
    }
  }, []);

  const copyCoords = async (lat?: number, lng?: number) => {
    if (!lat || !lng) return;
    try {
      await navigator.clipboard.writeText(`${lat}, ${lng}`);
      alert("Coordinates copied to clipboard");
    } catch {
      alert("Failed to copy");
    }
  };

  if (loading) return <p className="text-center text-white p-12">Loading...</p>;
  if (error) return <p className="text-center text-red-500 p-12">{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
        {place?.name || "Place"}
      </h1>

      {place?.address && <p className="text-slate-400 mt-2">{place.address}</p>}

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="text-sm text-slate-300">
          <div className="mb-2 flex items-center justify-between gap-4">
            <div>
              <div>
                <span className="text-slate-500">OSM ID:</span> {place?.id}
              </div>
              {place?.kinds && place.kinds.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {place.kinds.map((k) => (
                    <span
                      key={k}
                      className="bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              )}
              {place?.website && (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-sm text-blue-400 underline"
                >
                  Website
                </a>
              )}
            </div>

            {/* Coordinates + actions */}
            <div className="text-right">
              {place?.location ? (
                <>
                  <div className="text-xs text-slate-500">Coordinates</div>
                  <div className="text-sm text-slate-200">
                    {place.location.lat.toFixed(6)},{" "}
                    {place.location.lng.toFixed(6)}
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <button
                      onClick={() =>
                        copyCoords(place.location!.lat, place.location!.lng)
                      }
                      className="px-2 py-1 text-xs rounded bg-slate-800 hover:opacity-90"
                    >
                      Copy
                    </button>
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${place.location.lat}&mlon=${place.location.lng}#map=18/${place.location.lat}/${place.location.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 text-xs rounded bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white"
                    >
                      Open in OSM
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-sm text-slate-500">Location unknown</div>
              )}
            </div>
          </div>
        </div>

        {/* Map embed */}
        {place?.location ? (
          <div className="mt-4 rounded overflow-hidden border border-slate-800">
            {(() => {
              const lat = place.location!.lat;
              const lon = place.location!.lng;
              const delta = 0.01; // larger to include user location if near
              const left = lon - delta;
              const right = lon + delta;
              const bottom = lat - delta;
              const top = lat + delta;
              // if user location exists, expand bbox
              if (userLocation) {
                const ulat = userLocation.lat;
                const ulon = userLocation.lng;
                const minLat = Math.min(lat, ulat) - delta;
                const maxLat = Math.max(lat, ulat) + delta;
                const minLon = Math.min(lon, ulon) - delta;
                const maxLon = Math.max(lon, ulon) + delta;
                const src = `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lon}&marker=${ulat}%2C${ulon}`;
                return (
                  <div className="w-full h-64 md:h-80">
                    <iframe
                      title="place-map"
                      src={src}
                      style={{ border: 0 }}
                      loading="lazy"
                      className="w-full h-full"
                    />
                  </div>
                );
              } else {
                const src = `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lon}`;
                return (
                  <div className="w-full h-64 md:h-80">
                    <iframe
                      title="place-map"
                      src={src}
                      style={{ border: 0 }}
                      loading="lazy"
                      className="w-full h-full"
                    />
                  </div>
                );
              }
            })()}
            <div className="p-3 text-xs text-slate-400">
              Map shows approximate area. Red marker indicates your location.
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center text-slate-500">
            No location available to show on the map.
          </div>
        )}
      </div>
    </div>
  );
}
