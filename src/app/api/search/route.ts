// src/app/api/search/route.ts
import { OverpassElement } from "@/utils/types";
import { NextResponse } from "next/server";

type SearchBody = {
  lat: number;
  lng: number;
  radius?: number; // meters
  category?: string; // e.g., "park"|"playground"|"beach"
  limit?: number;
};

function buildOverpassQuery(
  lat: number,
  lng: number,
  radius = 2000,
  category?: string
) {
  // map category to OSM tags
  const tagFilters: Record<string, string> = {
    park: '["leisure"="park"]',
    playground: '["leisure"="playground"]',
    beach: '["natural"="beach"]',
    trail: '["highway"="path"]',
    stadium: '["leisure"="stadium"]',
    attraction: '["tourism"="attraction"]',
  };
  const tag =
    category && tagFilters[category]
      ? tagFilters[category]
      : '["leisure"~"^(park|playground|recreation_ground)$"]';

  // nodes + ways + relations
  const q = `
[out:json][timeout:25];
(
  node${tag}(around:${radius},${lat},${lng});
  way${tag}(around:${radius},${lat},${lng});
  relation${tag}(around:${radius},${lat},${lng});
);
out center ${/* include tags and geometry center */ ""};
`;
  return q;
}

function normalizeOverpassElement(
  el: OverpassElement,
  lat?: number,
  lng?: number
) {
  // return a normalized Place object
  const id = `${el.type}/${el.id}`;
  // center for ways/relations is in el.center, nodes have lat/lon
  const location =
    el.type === "node"
      ? { lat: el.lat, lng: el.lon }
      : el.center
      ? { lat: el.center.lat, lng: el.center.lon }
      : { lat, lng };
  const tags = el.tags || {};
  const kinds = [];
  if (tags.leisure) kinds.push(tags.leisure);
  if (tags.tourism) kinds.push(tags.tourism);
  if (tags.natural) kinds.push(tags.natural);

  const features: string[] = [];
  if (tags.playground) features.push("playground");
  if (tags.dog === "yes" || tags["dog"]) features.push("pet_friendly");
  if (tags.wheelchair === "yes") features.push("accessible");

  return {
    id,
    source: "overpass",
    name: tags.name || tags["official_name"] || `Place ${el.id}`,
    address: tags["addr:full"] || tags["addr:street"] || undefined,
    location,
    kinds,
    rating: undefined,
    userRatingsTotal: undefined,
    priceLevel: undefined,
    openNow: undefined,
    hours: tags.opening_hours ? { raw: tags.opening_hours } : undefined,
    features,
    photoUrl: tags.image || tags["image:0"] || undefined,
    website: tags.website || tags.url || undefined,
    distanceMeters: undefined,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SearchBody;
    const lat = body.lat;
    const lng = body.lng;
    const radius = body.radius ?? 2000;
    const category = body.category;
    const limit = body.limit ?? 30;

    const q = buildOverpassQuery(lat, lng, radius, category);
    const overpassUrl = "https://overpass-api.de/api/interpreter";

    const res = await fetch(overpassUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: q,
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Overpass error" }, { status: 502 });
    }
    const data = await res.json();
    const elements = data.elements || [];

    // normalize
    const places = elements
      .slice(0, limit)
      .map((el: OverpassElement) => normalizeOverpassElement(el, lat, lng));
    return NextResponse.json({ places }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err || "unknown" }, { status: 500 });
  }
}
