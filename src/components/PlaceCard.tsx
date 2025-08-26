"use client";
import React from "react";
import Link from "next/link";
import { Place } from "@/app/(main)/favorites/page";

function kindToIcon(kind?: string) {
  if (!kind) return "📍";
  const k = kind.toLowerCase();
  if (k.includes("park") || k.includes("natural") || k.includes("trail"))
    return "🌳";
  if (k.includes("playground")) return "🛝";
  if (k.includes("beach")) return "🏖️";
  if (k.includes("stadium") || k.includes("sports")) return "🏟️";
  if (k.includes("museum") || k.includes("attraction")) return "🏛️";
  if (k.includes("restaurant") || k.includes("cafe")) return "🍽️";
  if (k.includes("shop") || k.includes("retail")) return "🛍️";
  return "📍";
}

export default function PlaceCard({
  place,
  onOpen,
}: {
  place: Place;
  onOpen?: (p: Place) => void;
}) {
  const primaryKind =
    place.kinds && place.kinds.length > 0 ? place.kinds[0] : undefined;

  return (
    <div className="flex gap-3 p-3 rounded border border-slate-800 hover:shadow-lg bg-slate-900/50">
      <div className="w-20 h-20 bg-slate-800 rounded flex items-center justify-center overflow-hidden text-2xl">
        <span aria-hidden>{kindToIcon(primaryKind)}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-slate-100">{place.name}</h3>

          {place.id ? (
            <Link
              href={`/places/osm/${encodeURIComponent(place.id)}`}
              className="text-sm font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent hover:opacity-90"
            >
              Details
            </Link>
          ) : (
            onOpen && (
              <button
                onClick={() => onOpen(place)}
                className="text-sm font-medium text-slate-200 hover:underline"
              >
                Details
              </button>
            )
          )}
        </div>
        <p className="text-sm text-slate-400">
          {place.address ?? "No address"}
        </p>
        <div className="mt-2 text-xs text-slate-400 flex gap-2">
          {/* {place.features?.slice(0, 3).map((f) => (
            <span
              key={f}
              className="bg-slate-800 px-2 py-1 rounded text-slate-300"
            >
              {f}
            </span>
          ))} */}
        </div>
      </div>
    </div>
  );
}
