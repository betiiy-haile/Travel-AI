// src/components/MapClient.tsx
"use client";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Place } from "@/app/(main)/favorites/page";

export default function MapClient({
  places,
  center = { lat: 0, lng: 0 },
}: {
  places: Place[];
  center?: { lat: number; lng: number };
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!mapRef.current) {
      mapRef.current = L.map(ref.current).setView([center.lat, center.lng], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    // (mapRef.current as Place)._myMarkerLayer &&
    //   mapRef.current.removeLayer((mapRef.current as Place)._myMarkerLayer);
    const layer = L.layerGroup();
    places.forEach((p) => {
      if (!p.location) return;
      const m = L.marker([p.location.lat, p.location.lng]);
      m.bindPopup(`<strong>${p.name}</strong><br/>${p.address ?? ""}`);
      m.addTo(layer);
    });
    layer.addTo(mapRef.current);
    // (mapRef.current as any)._myMarkerLayer = layer;
    return () => {
      /* cleanup left to map */
    };
  }, [places, center]);

  return <div ref={ref} className="w-full h-80 rounded overflow-hidden" />;
}
