// src/app/profile/page.tsx
import React from "react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold">Profile & Preferences</h2>
      <div className="mt-4 p-4 border rounded">
        <p className="text-sm text-slate-400">
          Connect with Supabase auth to allow saving preferences and favorites.
        </p>
        <div className="mt-4">
          <label className="block text-sm">Max distance (km)</label>
          <input type="range" min={1} max={20} defaultValue={5} />
        </div>
      </div>
    </div>
  );
}
